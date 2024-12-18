'use client';

import React, { useEffect, useState } from 'react';

import { User } from '@/types/types';
import UserBasicProfile from './UserBasicProfile';

interface UserProfileViewProps {
    data: User;
}

const UserProfileView = ({ data }: UserProfileViewProps) => {
    const [isMobile, setIsMobile] = useState(false);

    // Update the state based on window width
    const handleResize = () => {
        setIsMobile(window.innerWidth < 640); // 640px is the 'sm' breakpoint in Tailwind
    };

    useEffect(() => {
        // Set the initial state
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <UserBasicProfile data={data} />
    );
};

export default UserProfileView;
