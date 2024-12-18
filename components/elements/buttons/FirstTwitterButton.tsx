'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

import { getAccessToken } from '@privy-io/react-auth';
import { getSession, signIn } from 'next-auth/react';

const FirstTwitterButton = () => {
    const router = useRouter();

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

    return (
        <button onClick={handleConnectTwitter} type="button" className="h-button h-button-border h-10 px-5 py-2.5 bg-white/10 items-center">
            <div className="text-blue-200 text-sm font-bold font-figtree leading-snug">
                CONNECT
                <span className="ml-1 icon-x-twitter text-blue-200 text-sm" />
            </div>
        </button>
    );
};

export default FirstTwitterButton;
