'use client';

import React, { Fragment, useState } from 'react';
import BaseDialog from './BaseDialog';

type ConfirmDialogProps = {
    message: string;
    open: any;
    setOpen: React.Dispatch<any>;
    callback: () => Promise<void>;
    confirmText?: string;
    cancelText?: string;
};

export default function ConfirmDialog({ message, confirmText = 'Confirm', cancelText = 'Cancel', open, setOpen, callback }: ConfirmDialogProps) {
    return (
        <BaseDialog open={open} setOpen={setOpen}>
            <div className="p-4 md:p-5 text-center">
                <svg className="mx-auto mb-4 text-blue-200 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <h3 className="mb-5 text-lg font-normal font-figtree text-white">{message}</h3>

                <div className="grid grid-cols-2 gap-4">
                    <button type="button" data-modal-hide="popup-modal" className="hype3-btn-secondary hype3-bg-light-to-teal" onClick={callback}>
                        {confirmText}
                    </button>

                    <button type="button" data-modal-hide="popup-modal" className="hype3-btn-secondary hype3-bg-light-to-teal" onClick={() => setOpen(false)}>
                        {cancelText}
                    </button>
                </div>
            </div>
        </BaseDialog>
    );
}
