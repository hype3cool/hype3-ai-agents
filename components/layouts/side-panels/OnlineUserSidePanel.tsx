'use client';
import React, { Fragment } from 'react';
import { DialogTitle } from '@headlessui/react';

import { dispatch } from '@/store';
import { closeSidePanel, openSidePanel } from '@/store/slices/menu';
import { User } from '@/types/types';

type OnlineUserSidePanelProps = {
    data: User[];
};

const OnlineUserSidePanel = ({ data: users }: OnlineUserSidePanelProps) => {
    // const handleClose = () => {
    //     dispatch(closeUploadProfilePic());
    // };

    const onClose = () => {
        dispatch(closeSidePanel());
    };

    const initialFocusRef = React.useRef(null);

    const handleOpenUserProfile = (user: any) => {
        dispatch(openSidePanel({ type: 'profile', data: user }));
    };

    return (
        <Fragment>
            <DialogTitle className="px-4 py-2 border-b border-white/10">
                <div className="flex items-center justify-between">
                    <button className="hype3-ghost-link-btn" onClick={onClose}>
                        <span className="icon-double-arrow-right ext-blue-400" />
                    </button>
                </div>
            </DialogTitle>
            <div ref={initialFocusRef}>
                <div className="relative my-5">
                    <div className="flex items-center justify-between px-4.5">
                        <h5 className="text-white font-semibold">Online ({users.length})</h5>
                    </div>
                    <div className="py-3 space-y-4">
                        {users.map((user, index) => (
                            <button key={index} className="flex items-center px-4.5 gap-x-1" onClick={() => handleOpenUserProfile(user)}>
                                <img src={user?.image || '/assets/images/frog-avatar.png'} alt="img" className="h-5 w-5 rounded-full border border-black object-cover mr-1" />
                                <h6 className="text-white font-semibold">{user?.username}</h6>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default OnlineUserSidePanel;
