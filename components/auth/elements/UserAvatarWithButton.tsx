import React from 'react';

import { User } from '@/types/types';
import UserAvatar from '@/components/elements/UserAvatar';

type UserAvatarWithButtonProps = {
    user: User;
    className?: string;
    onClick?: () => void;
};

const UserAvatarWithButton = ({ user, className, onClick }: UserAvatarWithButtonProps) => {
    return (
        <div className={`relative rounded-full ${className}`}>
            <UserAvatar user={user} className={`rounded-full ${className}`} />

            <button onClick={onClick} className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/80 rounded-full">
                <span className="icon-drawer-upload text-blue-200" />
            </button>
        </div>
    );
};

export default UserAvatarWithButton;
