'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { dispatch, useSelector } from '@/store';
import { removeUserTwitter, removeUserTwitterReset } from '@/store/slices/auth';
import { showMessage } from '@/utils/toast';
import LinkButton from '@/components/elements/buttons/LinkButton';

const TwitterVerifySection = () => {
    const router = useRouter();
    const { removeUserTwitterStatus, authUser } = useSelector((state: any) => state.auth);

    const handleSignInByTwitter = async () => {
        router.push('/api/twitter');
    };

    const handleRemoveTwitter = async () => {
        if (authUser?._id) {
            dispatch(removeUserTwitter(authUser?._id)); // update user profile as well
        }
    };

    useEffect(() => {
        if (removeUserTwitterStatus === 'success') {
            showMessage('Twitter account removed successfully', 'success');
            dispatch(removeUserTwitterReset());
        }
    }, [removeUserTwitterStatus]);

    return (
        <div className="grid grid-cols-1 gap-2.5">
            <label htmlFor="username-success" className="mb-4 form-label">
                Twitter Verification
            </label>

            <div className="flex flex-row items-center gap-x-0.5">
                {authUser && authUser?.twitter && authUser?.twitter?.id ? (
                    <>
                        <LinkButton icon="twitter" url={`https://twitter.com/${authUser?.twitter?.username}`} text={authUser?.twitter?.username} />
                        <button type="button" className="hype3-btn-secondary-thin-plain" onClick={handleRemoveTwitter}>
                            <span className="icon-unlink" /> Remove
                        </button>
                    </>
                ) : (
                    <button type="button" className="hype3-icon-text-btn text-blue-200 h6 font-semibold hype3-bg-emerald-to-teal" onClick={handleSignInByTwitter}>
                        Verify
                    </button>
                )}
            </div>
        </div>
    );
};

export default TwitterVerifySection;
