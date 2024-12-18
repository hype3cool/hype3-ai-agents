'use client';
import React, { useEffect, useRef } from 'react';

import { Button, FormLabel, Input, FormErrorMessage, InputGroup, InputLeftAddon, InputLeftElement } from '@chakra-ui/react';

// form
import * as yup from 'yup';
import {  useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { updateUsername, updateUsernameReset } from '@/store/slices/auth';
import { dispatch, IRootState, useSelector } from '@/store';
import { showMessage } from '@/utils/toast';
import { useRouter } from 'next/navigation';
import { closeMainDialog } from '@/store/slices/menu';

const schema = yup.object().shape({
    username: yup.string(),
});

const UpdateUsernameDialog = () => {
    const router = useRouter();
    const { authUser, updateUsernameStatus } = useSelector((state: IRootState) => state.auth);

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
        },
        mode: 'onChange',
    });

    // useEffect(() => {
    //     setFocus('username');
    // }, [setFocus]);

    const onSubmit = async (formData: any) => {
        // how to remove the prefix '@' before sending to backend, only first prefix
        // if (formData.username.startsWith('@')) {
        //     formData.username = formData.username.slice(1);
        // }

        if (authUser && authUser._id) {
            await dispatch(updateUsername(authUser._id, formData));
        }
    };



    useEffect(() => {
        if (updateUsernameStatus === 'success') {
            showMessage('Your username has been updated successfully', 'success');
            dispatch(updateUsernameReset());
            // // reset();
            
            router.push(`/user/${authUser?.username}`);
            dispatch(closeMainDialog());
            // router.refresh();
        } else if (updateUsernameStatus === 'failure') {
            // showMessage('Failed to update user profile', 'error');
        }
    }, [updateUsernameStatus]);

    return (
        <div className="w-full pl-7 pr-6 pt-9 pb-6 bg-black rounded-lg shadow border border-blue-200/10">
            <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="relative mb-6">
                    <div>
                        <FormLabel htmlFor={'username'} className={`form-label text-blue-200 text-base font-semibold font-figtree leading-snug tracking-tight`}>
                            Please choose your username
                        </FormLabel>
                        <InputGroup>
                            <InputLeftElement children={<span className="text-white/50 flex items-center py-1.5 px-2 pl-2.5">@</span>} />
                            <Input
                                data-autofocus
                                {...register('username')}
                                type="text"
                                placeholder=""
                                className="input active:border-none input-secondary w-full bg-black rounded-[18px] border-white/20 text-white text-sm font-semibold leading-tight tracking-normal placeholder:text-white/50 pl-6"
                                autoComplete="off"
                                sx={{
                                    borderWidth: '2px',
                                    '&:hover': {
                                        borderWidth: '2px',
                                    },
                                    '&:focus': {
                                        borderWidth: '2px',
                                    },
                                    '&:active': {
                                        borderWidth: '2px',
                                    },
                                    '&:focus-visible': {
                                        borderWidth: '2px',
                                    },
                                }}
                                //onChange={handleChange} // Handle change event to set value with prefix
                            />
                        </InputGroup>
                        {errors.username && typeof errors.username?.message === 'string' && (
                            <FormErrorMessage className="mt-2 font-semibold text-rose-400">{errors.username?.message}</FormErrorMessage>
                        )}
                        {/* </FormControl> */}
                    </div>
                </div>

                <div className="flex flex-col items-end gap-5 py-4">
                    <Button
                        type="submit"
                        className="hype3-btn-secondary hype3-bg-light-to-teal w-fit"
                        isDisabled={updateUsernameStatus === 'loading'}
                        sx={{
                            cursor: 'not-allowed',
                            '&:disabled': {
                                bg: 'gray.400',
                                color: '.100',
                            },
                        }}
                    >
                        UPDATE <span className="icon-arrow-next" />
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default UpdateUsernameDialog;
