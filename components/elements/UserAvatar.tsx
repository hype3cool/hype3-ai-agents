'use client';

import { useSelector } from '@/store';
import { User } from '@/types/types';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';

type UserAvatarProps = {
    user: User;
    className?: string;
};

// avatar without upload feature
const UserAvatar = ({ user, className = 'w-[30px] h-[30px]' }: UserAvatarProps) => {
    const { data: session, status } = useSession();
    const { authUser, updateProfileStatus } = useSelector((state: any) => state.auth);

    const [image, setImage] = React.useState<string>(user?.image || '/assets/images/frog-avatar.png');

    useEffect(() => {
        if (updateProfileStatus === 'success') {
            if (session?.user?.username == user.username) {
                setImage(authUser?.image || '/assets/images/frog-avatar.png');
            }
        }
    }, [updateProfileStatus, user, session]);

    return <img loading="lazy" className={`rounded-full ${className}`} src={image} alt={`${user?.username}`} />;
};

export default UserAvatar;
