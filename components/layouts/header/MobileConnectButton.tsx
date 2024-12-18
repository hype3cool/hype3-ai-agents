'use client';
import React from 'react';

import { useSession } from 'next-auth/react';

import { dispatch, useSelector } from '@/store';
import { closeUploadProfilePic, openSidePanel } from '@/store/slices/menu';
import { toggleSidebar } from '@/store/slices/themeConfigSlice';

import { getShortUsername } from '@/utils/displayUtils';
import Loading from '../loading';

import { useAuth } from '@/components/auth/AuthProvider';
import BaseAvatar from '@/components/user/BaseAvatar';

const MobileConnectButton = () => {
    const { login } = useAuth();

    const { status } = useSession();
    const { authUser, getMeStatus } = useSelector((state: any) => state.auth);

    const handleOpenPage = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        dispatch(closeUploadProfilePic());
        dispatch(toggleSidebar());
        dispatch(openSidePanel({ type: 'edit-profile', data: authUser }));
    };

    return (
        <>
            {status === 'authenticated' && authUser ? (
                <div className="flex flex-row items-center">
                    <div className="flex items-center sm:order-last gap-2" onClick={(e) => handleOpenPage(e)}>
                        {/* <UserAvatar user={authUser} /> */}
                        {getMeStatus === 'loading' ? (<Loading />): (<BaseAvatar image={authUser?.image} />)}
                        {authUser?.username && <h5 className="text-white font-semibold">{getShortUsername(authUser.username)}</h5>}
                    </div>
                </div>
            ) : (
                <div className="flex hype3-connect-wallet">
                    <button type="button" className="hype3-connect-wallet-btn" onClick={login}>
                        Connect Wallet
                    </button>
                </div>
            )}
        </>
    );
};

export default MobileConnectButton;
