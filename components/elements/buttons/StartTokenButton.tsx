'use client';
import React from 'react';
import { useCreateAgentClick } from '@/hooks/useCreateAgentClick';

const StartTokenButton = () => {
    const handleClick = useCreateAgentClick();

    return (
        <button onClick={handleClick} type="button" className="h-button h-button-border h-[50px] px-5 py-2.5 bg-white/10">
            <div className="base-white text-base font-semibold">Create New Agent 🩵</div>
        </button>
    );
};

export default StartTokenButton;
