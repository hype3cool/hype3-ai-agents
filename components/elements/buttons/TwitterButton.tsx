'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { dispatch, useSelector } from '@/store';
import { removeUserTwitter, removeUserTwitterReset } from '@/store/slices/auth';
import { showMessage } from '@/utils/toast';
import { useAuth } from '@/components/auth/AuthProvider';
import { getAccessToken } from '@privy-io/react-auth';
import { getSession, signIn } from 'next-auth/react';

const TwitterButton = () => {
    const router = useRouter();

    const { removeUserTwitterStatus, authUser } = useSelector((state: any) => state.auth);

    const hasTwitter = authUser && authUser?.twitter && authUser?.twitter?.id;

    const handleConnectTwitter = async () => {
        const access_token = await getAccessToken();

        await signIn('privy', {
            token: access_token,
            // callbackUrl: '/',
            redirect: false,
        });
        const session = await getSession();
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

    if (hasTwitter) {
        return (
            <button
                onClick={handleRemoveTwitter}
                type="button"
                className="h-[45px] p-3 bg-rose-400/10 rounded-[100px] border border-rose-400/20 justify-center items-center gap-3 inline-flex text-rose-400"
            >
                <span className="icon-x-twitter text-sm pl-1.5" />
                <div className="text-center text-base font-semibold font-figtree">Disconnect @${authUser?.twitter?.username}</div>
            </button>
        );
    }

    return (
        <button onClick={handleConnectTwitter} type="button" className="w-[152px] h-[45px] p-3 bg-slate-400/10 rounded-[100px] justify-center items-center gap-1.5 inline-flex">
            <div className="text-center text-white text-base font-semibold font-figtree">🔗 Connect</div>
            <span className="icon-x-twitter text-white text-sm" />
        </button>
    );
};

export default TwitterButton;
