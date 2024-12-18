'use client';
import React, { useState } from 'react';
import { User } from '@/types/types';

import { dispatch } from '@/store';
import { openSidePanel } from '@/store/slices/menu';

type UserAvatarProps = {
    user: User;
    className?: string;
};

const UserAvatar = ({ user, className = 'w-[30px] h-[30px]' }: UserAvatarProps) => {
    const handleOpenUserProfile = (user: any) => {
        dispatch(openSidePanel({ type: 'profile', data: user }));
    };

    const [image, setImage] = useState<string>(user?.image || '/assets/images/frog-avatar.png');

    return (
        <button type="button" onClick={(e) => handleOpenUserProfile(user)}>
            <img loading="lazy" className={`rounded-full ${className}`} src={image} alt={`${user?.username}`} />
        </button>
    );
};

export default UserAvatar;
