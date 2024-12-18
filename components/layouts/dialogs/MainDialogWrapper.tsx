'use client';

import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { Z_INDEX } from '@/theme/zIndex';

// redux
import { dispatch, useSelector } from '@/store';
import { IRootState } from '@/store';
import { NewUserDialog, PresaleDialog, UpdateUsernameDialog, UploadImageDialog } from '@/components/layouts/dialogs';
import { closeMainDialog } from '@/store/slices/menu';
import { DIALOG_NAMES } from '@/constants/constants';
import { Coin } from '@/types/types';

const MainDialogWrapper = () => {
    const { mainDialog } = useSelector((state: IRootState) => state.menu);

    const handleClose = () => {
        dispatch(closeMainDialog());
    };

    return (
        <Transition appear show={mainDialog.open} as={Fragment}>
            <Dialog as="div" open={mainDialog.open} onClose={handleClose} className="relative" style={{ zIndex: Z_INDEX.modal }}>
                <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-[black]/60" />
                </TransitionChild>
                <div className="fixed inset-0 overflow-hidden">
                    <div className="flex min-h-full items-center justify-center px-4 py-8">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="w-full max-w-lg">
                                {mainDialog.type === DIALOG_NAMES.NEW_USER && <NewUserDialog />}
                                {mainDialog.type === DIALOG_NAMES.UPDATE_USERNAME && <UpdateUsernameDialog />}
                                {mainDialog.type === DIALOG_NAMES.UPLOAD_IMAGE && <UploadImageDialog />}
                                {mainDialog.type === DIALOG_NAMES.PRESALE && <PresaleDialog coin={mainDialog.data as Coin} />}
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default MainDialogWrapper;
