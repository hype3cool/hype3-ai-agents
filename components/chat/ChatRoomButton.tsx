'use client';
import React from 'react';

type ChatRoomButtonProps = {
    isActive: boolean;
    onClick: () => void;
    label: string;
    size?: 'small' | 'normal';
};

const ChatRoomButton = ({ isActive, onClick, label = 'Audio Space', size = 'normal' }: ChatRoomButtonProps) => {

    const className = size === 'small' ? 'px-3 py-2 rounded-[18px] h-[30px] min-h-[30px]' : 'px-5 py-3.5 rounded-[18px] h-[35px] min-h-[35px]';
    
    return (
        <button
            type="button"
            className={`${className} whitespace-nowrap gap-2.5 text-purple-600 text-sm font-bold 
            !bg-purple-600/20 border border-transparent hover:bg-purple-600/20 transition-all delay-100`}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default ChatRoomButton;
