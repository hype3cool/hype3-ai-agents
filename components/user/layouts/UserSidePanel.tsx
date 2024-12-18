'use client';
import React, { Suspense, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { DialogTitle } from '@headlessui/react';

import { dispatch } from '@/store';
import { closeSidePanel } from '@/store/slices/menu';

import { User } from '@/types/types';

import UserBasicProfile from '../UserBasicProfile';
import { UserService } from '@/services/user.service';
import Loading from '@/app/loading';

type UserSidePanelProps = {
    data: User;
};

const UserSidePanel = ({ data }: UserSidePanelProps) => {
    const router = useRouter();

    const [user, setUser] = React.useState<User | undefined>(undefined);
    const [isLoading, setIsLoading] = React.useState(true);

    const onClose = () => {
        dispatch(closeSidePanel());
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!data?.username) return;
            try {
                // Replace with your actual fetch logic
                const res = await new UserService().getProfile(data?.username); // Adjust API endpoint as needed

                setUser(res.data); // Set fetched user data
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [data?.username]);

    return (
        <>
            <DialogTitle className="px-4 py-2 border-b border-white/10">
                <div className="flex items-center justify-start">
                    <button className="hype3-ghost-link-btn" onClick={onClose}>
                        <span className="icon-double-arrow-right ext-blue-400" />
                    </button>
                </div>
            </DialogTitle>

            <Suspense fallback={<Loading />}>{user && <UserBasicProfile data={user} hasTabs={true} isSideBar={true} />}</Suspense>
        </>
    );
};

export default UserSidePanel;
