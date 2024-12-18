'use client';
import React, { useEffect, useRef } from 'react';

// form
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from '@/components/form/InputField';
import { skipTwitterNotification, skipTwitterNotificationReset } from '@/store/slices/auth';
import { dispatch, IRootState, useSelector } from '@/store';
import { showMessage } from '@/utils/toast';
import { useRouter } from 'next/navigation';
import { closeMainDialog } from '@/store/slices/menu';
import TwitterButton from '@/components/elements/buttons/TwitterButton';
import FirstTwitterButton from '@/components/elements/buttons/FirstTwitterButton';

const schema = yup.object().shape({
    username: yup.string(),
    isCreator: yup.boolean(),
});

const NewUserDialog = () => {
    const router = useRouter();
    const { authUser, skipTwitterNotificationStatus } = useSelector((state: IRootState) => state.auth);
    const usernameRef = useRef<HTMLInputElement>(null);

    const {
        control,
        handleSubmit,
        setError,
        register,
        formState: { errors, isValid, isDirty },
        setValue,
        watch,
        reset,
        setFocus,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            username: authUser?.username || '',
            isCreator: true,
        },
        mode: 'onChange',
    });

    useEffect(() => {
        setFocus('username');
    }, [setFocus]);

    // const onSubmit = async (formData: any) => {
    //     // how to remove the prefix '@' before sending to backend, only first prefix
    //     // if (formData.username.startsWith('@')) {
    //     //     formData.username = formData.username.slice(1);
    //     // }

    //     if (authUser && authUser._id) {
    //         await dispatch(newUserUpdateProfile(authUser._id, formData));
    //     }
    // };

    // useEffect(() => {
    //     if (newUserUpdateProfileStatus === 'success') {
    //         showMessage('Welcome to join hype3!!', 'success');
    //         dispatch(newUserUpdateProfileReset());
    //         // reset();
    //         dispatch(closeMainDialog());
    //         // router.push('/');
    //         router.refresh();
    //     } else if (newUserUpdateProfileStatus === 'failure') {
    //         // showMessage('Failed to update user profile', 'error');
    //     }
    // }, [newUserUpdateProfileStatus]);

    const handleSkip = () => {
        if (authUser && authUser._id) {
            dispatch(skipTwitterNotification(authUser?._id));
        }
        // dispatch(closeMainDialog());
    };

    useEffect(() => {
        return () => {
            if (skipTwitterNotificationStatus === 'success') {
                dispatch(skipTwitterNotificationReset());
                dispatch(closeMainDialog());
            }
            // else if (skipTwitterNotificationStatus === 'failure') {
            //     showMessage('Failed to skip Twitter notification', 'error');
            // }
        };
    }, [skipTwitterNotificationStatus]);

    return (
        <div className="w-full pl-7 pr-6 pt-9 pb-6 bg-black rounded-lg shadow border border-blue-200/10">
            <div className="flex flex-col items-center justify-between space-y-6">
                <div className="w-[385px] text-center text-blue-200  text-xl font-semibold font-figtree leading-7 tracking-tight">🔗 Connect X account to start earning as a verified creator</div>

                <FirstTwitterButton />

                <button type="button" onClick={handleSkip} className="text-center text-white/70 text-sm font-semibold font-figtree leading-snug tracking-tight">
                    Skip for now 👉🏻
                </button>
            </div>
        </div>
    );
};

export default NewUserDialog;
