'use client';
import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

import { dispatch, useSelector } from '@/store';
import BaseAvatar from '@/components/user/BaseAvatar';
import Loading from '@/components/layouts/loading';

import { closeUploadProfilePic, openSidePanel } from '@/store/slices/menu';
import { useAuth } from '../AuthProvider';

// import DisconnectButton from '@/components/elements/buttons/DisconnectButton';
// import confirmDialog from '@/components/elements/confirm-dialog';

const ConnectButton = () => {
    const { login, logout } = useAuth();

    const { status } = useSession();
    const { authUser, getMeStatus } = useSelector((state: any) => state.auth);

    const router = useRouter();

    // click and redirect to profile page , `/user/${authUser?.username}`
    const handleClick = (e: any) => {
        e.stopPropagation();
        // // dispatch(closeUploadProfilePic());
        router.push(`/user/${authUser?.username}`);
    };

    // const [confirmationModal, setConfirmationModal] = useState<any>(false);

    // const handleDisconnect = async () => {
    //     logout();
    //     setConfirmationModal(false);
    // };

    // const handleOpenConfirmation = () => {
    //     setConfirmationModal(true);
    // };

    return (
        <>
            {status === 'authenticated' && authUser ? (
                <div className="hidden sm:flex flex-col-reverse sm:flex-row items-center gap-2">
                    <button type="button" className="flex items-center sm:order-last" onClick={(e) => handleClick(e)}>
                        {getMeStatus === 'loading' ? <Loading /> : <BaseAvatar image={authUser?.image} />}
                    </button>
                </div>
            ) : (
                <div className="hidden sm:block">
                    <button type="button" className="h-button h-button-border h-10 min-h-10 px-5 py-2.5 bg-white/10" onClick={login}>
                        <div className="text-white text-base font-semibold font-figtree">Sign In</div>
                    </button>
                </div>
            )}
            {/* {confirmDialog('Disconnect wallet?', confirmationModal, setConfirmationModal, handleDisconnect)} */}
        </>
    );
};

export default ConnectButton;
