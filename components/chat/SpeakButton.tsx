'use client';
import React from 'react';

type SpeakButtonProps = {
    isActive: boolean;
    onClick: () => void;
    size?: 'small' | 'normal';
};

const SpeakButton = ({ isActive, onClick, size = 'normal' }: SpeakButtonProps) => {

    const sizeClassname = size === 'small' ? 'px-3 py-2 rounded-[18px] h-[30px] min-h-[30px]' : 'px-5 py-3.5 rounded-[18px] h-[35px] min-h-[35px]';

    return (
        <button
            type="button"
            className={`${sizeClassname} whitespace-nowrap gap-2.5  text-base font-bold 
                !bg-blue-400/10 border border-transparent hover:bg-cyan-400/20 hover:border-cyan-400 transition-all delay-100 active:bg-lemon-400/20 active:border active:border-lemon-400/70
                ${isActive ? 'text-lemon-400 !bg-lemon-400/20 !border-lemon-400/70' : 'text-cyan-400'} 
                `}
            onClick={onClick}
        >
            {isActive ? 'Mute' : 'Speak'}
            {isActive && <span className="icon-mic-off3" />}
        </button>
    );
};

export default SpeakButton;
