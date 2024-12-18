'use client';

import React from 'react';
import { useGetUser } from '@/hooks/useUser';
import UserProfileCard from '../profile/UserProfileCard';
import UserProfileTabView from './UserProfileTabView';

type UserProfileContentProps = {
    username: string;
};

const UserProfileContent = ({ username }: UserProfileContentProps) => {
    const { data: user, error, isLoading } = useGetUser(username);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            {user && user?.username && (
                <>
                    <UserProfileCard user={user} />
                    <div className="mt-10">
                        <UserProfileTabView username={user?.username} />
                    </div>
                </>
            )}
        </div>
    );
};

export default UserProfileContent;
