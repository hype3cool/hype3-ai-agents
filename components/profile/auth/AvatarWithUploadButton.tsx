import React from 'react';

import { User } from '@/types/types';

import { useSession } from 'next-auth/react';

type AvatarWithUploadButtonProps = {
    imageUrl?: string;
    className?: string;
    isAuthUser?: boolean;
    onClick?: () => void;
};

const AvatarWithUploadButton = ({ imageUrl, isAuthUser, className, onClick }: AvatarWithUploadButtonProps) => {
    const { status } = useSession();

    return (
        <div className={`relative rounded-full ${className}`}>
            <img className="w-[60px] h-[60px] rounded-full" src={imageUrl || '/assets/images/frog-avatar2.png'} alt="Profile Image" />

            {isAuthUser && (
                <button onClick={onClick} className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/80 rounded-full">
                    <span className="icon-upload text-white text-2xl" />
                </button>
            )}
        </div>
    );
};

export default AvatarWithUploadButton;
