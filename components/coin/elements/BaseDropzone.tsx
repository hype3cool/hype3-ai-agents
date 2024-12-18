import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { useDropzone } from 'react-dropzone';

import { showMessage } from '@/utils/toast';
import axios from 'axios';
import { Button } from '@chakra-ui/react';

import { useFormContext, RegisterOptions } from 'react-hook-form';

// import toast from 'react-hot-toast';
export interface IUploadMedia {
    filename?: string;
    url?: string;
    size?: number;
    contentType?: string;
}

export default function BaseDropzone(props: {
    path?: string;
    mediaUri?: IUploadMedia;
    setMediaUri: Dispatch<SetStateAction<IUploadMedia>>;
    disabled?: boolean;
    viewOnly?: boolean;
    width?: number;
    height?: number;
}) {
    const { path, mediaUri, setMediaUri, disabled, viewOnly, width = 200, height = 200 } = props;

    const {
        register,
        formState: { errors },
    } = useFormContext();

    // const avatarRef = useRef(null);
    // const [files, setFiles] = useState([]);
    const [progress, setProgress] = useState(0);
    const [files, setFiles] = useState<{ preview: string; filename: string }[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': [],
        },
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                        filename: file.name,
                    }),
                ),
            );
        },
    });

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, []);

    const uploadFiles = async () => {
        if (!files || files.length == 0) {
            showMessage('Please select image first', 'error');
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
                    },
                });

                if (response.data && response.data.status == 'success') {
                    const { data } = response.data;
                    setMediaUri({
                        filename: file.filename,
                        url: data.url,
                        // size: response.data.size,
                        // contentType: response.data.contentType,
                    });
                }
            }
        } catch (err) {
            console.log(err);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="flex items-center justify-between">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />

                <div className="flex justify-center items-center font-figtree transition-all delay-100 w-[100px] h-[100px] rounded-[10px] hype3-bg-light-to-teal overflow-hidden">
                    {files.length > 0 ? (
                        <PreviewBox width={width} height={height}>
                            <img
                                src={files[0].preview}
                                style={{
                                    display: 'block',
                                    width: '100%',
                                    height: '100%',
                                    maxWidth: `${width}px`,
                                    maxHeight: `${height}px`,
                                }}
                                onLoad={() => {
                                    URL.revokeObjectURL(files[0].preview);
                                }}
                            />
                        </PreviewBox>
                    ) : (
                        <>
                            {mediaUri?.url ? (
                                <PreviewBox width={width} height={height}>
                                    <img
                                        src={mediaUri.url}
                                        style={{
                                            objectFit: 'fill',
                                            display: 'block',
                                            width: '100%',
                                            height: '100%',
                                            maxWidth: `${width}px`,
                                            maxHeight: `${height}px`,
                                        }}
                                    />
                                </PreviewBox>
                            ) : (
                                <span className="icon-drawer-upload text-3xl text-blue-200 font-medium" />
                            )}
                        </>
                    )}
                </div>
            </div>
            <div className="ml-3 flex flex-col gap-y-2 w-[200px]">
                {files[0]?.filename && <div className="my-auto grow pl-3 truncate">{files[0]?.filename}</div>}
                {!viewOnly && (
                    <Button
                        type="button"
                        className="px-5 py-3.5 rounded-[18px] h-[30px] min-h-[30px] text-blue-200 text-sm font-bold font-figtree leading-snug tracking-tight whitespace-nowrap gap-2.5 hype3-bg-light-to-teal w-fit"
                        onClick={uploadFiles}
                    >
                        {isUploading ? 'Loading...' : 'Upload Image'}
                    </Button>
                )}
            </div>
        </div>
    );
}

function PreviewBox(props: { children: React.ReactNode; width: number; height: number }) {
    const { children, width, height } = props;

    return (
        <div className={`rounded-md flex justify-center items-center max-w-[${width}px] max-h-[${height}px] w-[${width}px] h-[${height}px] bg-white`}>
            <div className="flex min-w-0 overflow-hidden rounded-md">{children}</div>
        </div>
    );
}
