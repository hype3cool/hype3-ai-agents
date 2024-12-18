'use client';
import React from 'react';
import { usePrivy } from '@privy-io/react-auth';

import { useAuth } from '@/components/auth/AuthProvider';
import { PAGE_LINKS } from '@/constants/constants';

const JoinAsCreatorLinkButton = () => {
    const { ready, authenticated } = usePrivy();
    const { login } = useAuth();

    const handleClick = async () => {
        if (ready && !authenticated) {
            await login();
            return;
        }

        window.location.href = PAGE_LINKS['TOKEN_CREATE'];
    };

    return (
        <button onClick={handleClick} type="button" className="px-5 py-3.5">
            <div className="text-center text-blue-200 text-sm font-semibold base mt-3.5">Join as Creator</div>
        </button>
    );
};

export default JoinAsCreatorLinkButton;
