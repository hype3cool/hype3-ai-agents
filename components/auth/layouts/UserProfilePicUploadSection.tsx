'use client';

import React, { useEffect, useState } from 'react';
import { useSession, getSession } from 'next-auth/react';

import { useDropzone } from 'react-dropzone';
import axios from 'axios';

import { DEFAULT_USER_PROFILE_PIC } from '@/constants/constants';
import { showMessage } from '@/utils/toast';

import { updateProfile, updateProfileReset } from '@/store/slices/auth';
import { dispatch, useSelector } from '@/store';

const UserProfilePicUploadSection = () => {
    const [selectedPic, setSelectedPic] = useState<number>(-1);

    const { getRootProps, getInputProps, isDragActive, files, removeFile } = useImageUpload();

    const { data: session, status } = useSession();
    const { authUser, updateProfileStatus } = useSelector((state: any) => state.auth);

    const [avatar, setAvatar] = useState<string>(authUser?.image || '/assets/images/frog-avatar.png');
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = async () => {
        if (session?.user?.id == undefined) return;

        // if no file selected, update user with default profile pic selected
        if (!files || files.length == 0) {
            // check if user has selected an image from default profile pics
            if (selectedPic == -1) return showMessage('Please select image first', 'error');
            await dispatch(updateProfile(session.user.id, { image: DEFAULT_USER_PROFILE_PIC[selectedPic] }));
        }

        if (isUploading) return;

        try {
            setIsUploading(true);

            for (let index = 0; index < files.length; index++) {
                const file = files[index];

                const formData = new FormData();
                formData.append('file', file as any);

                // TODO: protect this endpoint by adding a token
                const response = await axios.post(process.env.NEXT_PUBLIC_API_HOST + `/upload`, formData, {
                    headers: {
                        'content-type': 'multipart/form-data',
                        'Authorization': `Bearer ${session?.backendTokens?.accessToken}`,
                    },
                });

                if (response.data && response.data.status == 'success') {
                    const { data } = response.data;
                    await dispatch(updateProfile(session?.user?.id, { image: data.url }));
                }
            }
        } catch (err) {
            console.log(err);
        } finally {
            setIsUploading(false);
        }
    };

    useEffect(() => {
        if (updateProfileStatus == 'success') {
            showMessage('Profile picture updated successfully', 'success');
            setAvatar(authUser.image);
            removeFile(0);
            dispatch(updateProfileReset());
        }
    }, [updateProfileStatus]);

    useEffect(() => {
        if (selectedPic > -1) setAvatar(DEFAULT_USER_PROFILE_PIC[selectedPic]);
    }, [selectedPic]);

    useEffect(() => {
        if (files.length > 0) {
            setAvatar(files[0]?.preview || '');
        }
    }, [files]);

    const handleSelectPic = (index: number) => {
        files.length > 0 && removeFile(0);
        setSelectedPic(index);
    };

    return (
        <section className="flex flex-col justify-center items-center px-6 mt-10 w-full font-bold text-center text-blue-200">
            <div className="mb-4">{avatar && <img id="currentAvatar" className="w-[120px] h-[120px] rounded-full border border-black" src={avatar} />}</div>
            <div className="my-6 grid grid-cols-4 gap-4">
                {Array.from({ length: DEFAULT_USER_PROFILE_PIC.length }).map((_, index) => (
                    <div key={index} className="w-20 h-20 rounded-full border-2 border-black hover:border-blue-200 overflow-hidden" onClick={() => handleSelectPic(index)}>
                        <img src={DEFAULT_USER_PROFILE_PIC[index]} alt={`default-user-profile-pic-${index}`} />
                    </div>
                ))}
                <div {...getRootProps()} className="flex justify-center items-center font-figtree transition-all delay-100 w-20 h-20 rounded-full hype3-bg-light-to-teal">
                    <input {...getInputProps()} />
                    {isDragActive ? <p className="text-blue-200 font-medium">Drop image</p> : <span className="icon-drawer-upload text-2xl text-blue-200 font-medium" />}
                </div>
            </div>
            <div className="my-4">
                <button type="button" className="hype3-btn-secondary hype3-bg-light-to-teal" onClick={handleUpload}>
                    Update
                </button>
            </div>
        </section>
    );
};

export default UserProfilePicUploadSection;

// Reusable image upload hook
const useImageUpload = () => {
    const [files, setFiles] = useState<{ preview: string }[]>([]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'image/*': [],
        },
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            );
        },
    });

    const removeFile = (index: any) => {
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
    };

    return {
        getRootProps,
        getInputProps,
        isDragActive,
        files,
        removeFile,
    };
};
