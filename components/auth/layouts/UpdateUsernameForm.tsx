'use client';
import React, { useEffect } from 'react';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// redux
import { dispatch, useSelector } from '@/store';
import { getMeReset, updateProfile, updateProfileReset } from '@/store/slices/auth';
import { User } from '@/types/types';

import usernameSchema from '@/constants/username.schema';

type UpdateUsernameFormProps = {
    user: User;
    onFormSubmit: () => void;
};

const UpdateUsernameForm = ({ user, onFormSubmit }: UpdateUsernameFormProps) => {
    const { updateProfileStatus } = useSelector((state: any) => state.auth);

    const {
        control,
        handleSubmit,
        setError,
        register,
        formState: { errors, isValid, isDirty },
        setValue,
        watch,
    } = useForm({
        resolver: yupResolver(usernameSchema),
        defaultValues: {
            username: user.username || '',
        },
        mode: 'onChange',
    });

    const onSubmit = async (inputData: any) => {
        inputData.username = inputData.username.trim();

        if (user._id) {
            await dispatch(updateProfile(user._id, { username: inputData.username }));
            // Notify the parent component to update the formKey
            onFormSubmit();
        }
    };

    useEffect(() => { 
        if (updateProfileStatus === 'success') {
            dispatch(updateProfileReset());
            dispatch(getMeReset());
        }
    }, [updateProfileStatus]);

    return (
        <form className="form space-y-5 dark:text-white" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
                <label htmlFor="username" className="mb-5 form-label">
                    Username
                </label>

                <input
                    id="username"
                    type="text"
                    placeholder="your username"
                    className="px-4 input active:border-none input-secondary min-w-full max-w-xs bg-black border
                                text-white text-sm font-semibold leading-tight tracking-normal placeholder:text-white/50"
                    {...register('username', { required: true })}
                    autoComplete="off"
                />
                {errors.username && <p className="text-right mt-2 text-[10px] text-rose-400">{errors.username.message}</p>}
            </div>
            <div className="flex justify-end">
                <button type="submit" className="hype3-btn-secondary hype3-bg-light-to-teal disabled:opacity-50" disabled={updateProfileStatus === 'loading' || !isValid || !isDirty}>
                    Update
                </button>
            </div>
        </form>
    );
};

export default UpdateUsernameForm;
