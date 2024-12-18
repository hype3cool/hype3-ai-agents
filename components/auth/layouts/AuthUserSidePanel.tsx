'use client';
import React, { Fragment } from 'react';
import { DialogTitle } from '@headlessui/react';

import UserProfilePicUploadSection from './UserProfilePicUploadSection';

import { dispatch, useSelector } from '@/store';
import { closeSidePanel, closeUploadProfilePic } from '@/store/slices/menu';
import UserProfileBasicSetup from './UserProfileBasicSetup';

const AuthUserSidePanel = () => {
    const { isUploadProfilePic } = useSelector((state: any) => state.menu);

    const handleClose = () => {
        dispatch(closeUploadProfilePic());
    };

    const onClose = () => {
        dispatch(closeSidePanel());
    };

    const initialFocusRef = React.useRef(null);

    return (
        <Fragment>
            <DialogTitle className="px-4 py-2 border-b border-white/10">
                {isUploadProfilePic ? (
                    <div className="flex items-center justify-between">
                        <button className="hype3-ghost-link-btn" onClick={handleClose}>
                            <span className="icon-arrow-up-thin font-bold rotate-180" />
                        </button>
                        <h6 className="text-center text-blue-400 font-semibold">Profile Picture</h6>
                    </div>
                ) : (
                    <div className="flex items-center justify-between">
                        <button className="hype3-ghost-link-btn" onClick={onClose}>
                            <span className="icon-double-arrow-right ext-blue-400" />
                        </button>
                    </div>
                )}
            </DialogTitle>
            <div ref={initialFocusRef}>{isUploadProfilePic ? <UserProfilePicUploadSection /> : <UserProfileBasicSetup onClose={onClose} />}</div>
        </Fragment>
    );
};

export default AuthUserSidePanel;
