'use client';
import React from 'react';

type LiveButtonProps = {
    isActive: boolean;
    onActiveClick: () => void;    
    onInactiveClick: () => void;    
    size?: 'small' | 'normal';
};

const LiveButton = ({ isActive, onActiveClick, onInactiveClick,  size = 'normal' }: LiveButtonProps) => {
    const sizeClassname = size === 'small' ? 'px-3 py-2 rounded-[18px] h-[30px] min-h-[30px]' : 'px-5 py-3.5 rounded-[18px] h-[35px] min-h-[35px]';

    return (
        <button
            type="button"
            className={`${sizeClassname} whitespace-nowrap gap-2.5  text-base font-bold 
                !bg-orange-200/10 border border-transparent hover:bg-orange-400/25 hover:border-orange-400 transition-all delay-100 active:bg-orange-400/25 active:border active:border-orange-400/70
                ${isActive ? 'text-orange-400 !bg-orange-400/25 !border-orange-400/70' : 'text-orange-400'} 
                `}
            onClick={isActive ? onActiveClick : onInactiveClick}
        >
            {isActive ? 'Stop Stream' : 'Go Live'}
            {isActive && <span className="icon-logout" />}
        </button>
    );
};

export default LiveButton;
