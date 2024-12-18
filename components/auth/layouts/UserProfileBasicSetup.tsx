'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

import { dispatch, useSelector } from '@/store';

import Loading from '@/components/layouts/loading';
import { getShortUsername, showExplorer } from '@/utils/displayUtils';
import DisconnectButton from '@/components/elements/buttons/DisconnectButton';
import { useAuth } from '@/components/auth/AuthProvider';
import UpdateUsernameForm from './UpdateUsernameForm';
import TwitterVerifySection from './TwitterVerifySection';
import confirmDialog from '@/components/elements/confirm-dialog';
import UserAvatarWithButton from '../elements/UserAvatarWithButton';
import { openUploadProfilePic } from '@/store/slices/menu';
import { showMessage } from '@/utils/toast';
import { updateProfileReset } from '@/store/slices/auth';
import { usePrivy } from '@privy-io/react-auth';
import { signOut } from 'next-auth/react';

type UserProfileBasicSetupProps = {
    onClose: () => void;
};

const UserProfileBasicSetup = ({ onClose }: UserProfileBasicSetupProps) => {
    const router = useRouter();
    const pathname = usePathname();

    // const { logout } = useAuth();
    const { logout } = usePrivy();
    const { updateProfileStatus, authUser } = useSelector((state: any) => state.auth);

    const handleViewProfileClick = () => {
        onClose();
        router.push(`/user/${authUser?.username}`);
    };

    // confirmation before disconnecting wallet
    const [confirmationModal, setConfirmationModal] = useState<any>(false);

    // logout
    const handleDisconnect = async () => {
        await logout();
        await signOut();
        setConfirmationModal(false);
    };

    const handleOpenConfirmation = () => {
        setConfirmationModal(true);
    };

    const openUploadProfilePanel = () => {
        dispatch(openUploadProfilePic());
    };

    const [formKey, setFormKey] = useState(0); // State to trigger re-render

    const handleFormSubmit = () => {
        setFormKey((prevKey) => prevKey + 1); // Update key to trigger re-render
    };

    useEffect(() => {
        if (updateProfileStatus === 'success') {
            showMessage('Username updated successfully', 'success');
            dispatch(updateProfileReset());

            refreshNewProfilePage();
        }
    }, [updateProfileStatus]);

    const refreshNewProfilePage = () => {
        // check if the current route is different from the new profile page
        if (pathname !== `/user/${authUser.username}`) {
            router.push(`/user/${authUser.username}`);
        }
    };

    return (
        <div>
            <section className="flex flex-row items-center px-6 mt-10 w-full font-bold text-center text-blue-200">
                {authUser && (
                    <div className="flex items-center flex-grow flex-row gap-4">
                        <UserAvatarWithButton user={authUser} className="w-[55px] h-[55px]" onClick={openUploadProfilePanel} />
                        {authUser && authUser?.username && (
                            <h3 className="font-medium tooltip tooltip-top" data-tip={authUser?.username}>
                                {getShortUsername(authUser?.username) || ''}
                            </h3>
                        )}
                    </div>
                )}
                {authUser && authUser?.walletAddresses && authUser?.walletAddresses[0]?.address && (
                    <div className="flex flex-row gap-2.5">
                        <Link className="flex-center" href={showExplorer(authUser?.walletAddresses[0]?.address)} target="_blank">
                            <button type="button" className="hype3-icon-btn hype3-bg-emerald-to-teal">
                                <span className="icon-expand text-blue-200 text-sm" />
                            </button>
                        </Link>
                    </div>
                )}
            </section>
            <section className="flex flex-col px-6 mt-10 w-full font-bold text-center text-blue-200">
                <div className="grid grid-cols-2 gap-3">
                    <button type="button" className="hype3-btn-primary hype3-bg-light-to-teal" onClick={handleViewProfileClick}>
                        VIEW PROFILE
                    </button>
                    <DisconnectButton onClick={handleOpenConfirmation} />
                </div>
            </section>
            <section className="flex flex-col px-6 mt-10">
                {authUser ? (
                    <div className="grid grid-cols-1 gap-2.5">
                        <UpdateUsernameForm key={formKey} user={authUser} onFormSubmit={handleFormSubmit} />
                    </div>
                ) : (
                    <Loading />
                )}

                <TwitterVerifySection />
            </section>
            {confirmDialog('Disconnect wallet?', confirmationModal, setConfirmationModal, handleDisconnect)}
        </div>
    );
};

export default UserProfileBasicSetup;
