'use client';
import React from 'react';
import { usePrivy } from '@privy-io/react-auth';

import { useAuth } from '@/components/auth/AuthProvider';
import { PAGE_LINKS } from '@/constants/constants';

const StartTokenButton = () => {    
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
        <button onClick={handleClick} type="button" className="h-button h-button-border h-10 px-5 py-2.5 bg-white/10">
            <div className="base-white text-base font-semibold">Create New Agent 🩵</div>
        </button>
    );
};

export default StartTokenButton;
