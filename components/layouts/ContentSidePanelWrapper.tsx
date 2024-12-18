'use client';
import React, { Fragment } from 'react';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';

import { Z_INDEX } from '@/theme/zIndex';

import { dispatch, useSelector } from '@/store';
import { closeSidePanel } from '@/store/slices/menu';

import AuthUserSidePanel from '../auth/layouts/AuthUserSidePanel';
import UserSidePanel from '../user/layouts/UserSidePanel';
import OnlineUserSidePanel from './side-panels/OnlineUserSidePanel';

const ContentSidePanelWrapper = () => {
    const { isSidePanelOpen, sidePanelType, sidePanelData } = useSelector((state: any) => state.menu);
    
    const handleClose = () => {
        dispatch(closeSidePanel());
    };

    const initialFocusRef = React.useRef(null);

    return (
        <>
            <Transition appear show={isSidePanelOpen} as={Fragment}>
                <Dialog as="div" className="relative" style={{ zIndex: Z_INDEX.sidebar }} onClose={() => handleClose()} initialFocus={initialFocusRef}>
                    <TransitionChild as={Fragment} enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-black/25" aria-hidden="true" />
                    </TransitionChild>

                    <div className="fixed inset-0 w-screen">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95 transform translate-x-full"
                                enterTo="opacity-100 scale-100 transform translate-x-0"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100 transform translate-x-0"
                                leaveTo="opacity-0 scale-95 transform translate-x-full"
                            >
                                <DialogPanel className="fixed bottom-0 top-0 sm:my-2 w-full sm:w-5/6 md:max-w-[480px] overflow-x-hidden overflow-y-auto rounded-lg border border-blue-400 border-opacity-5 bg-black text-left align-middle shadow-xl ltr:right-2">
                                    {sidePanelType == 'edit-profile' && <AuthUserSidePanel />}
                                    {sidePanelType == 'profile' && <UserSidePanel data={sidePanelData} />}
                                    {sidePanelType == 'online-user' && <OnlineUserSidePanel data={sidePanelData} />}
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default ContentSidePanelWrapper;
