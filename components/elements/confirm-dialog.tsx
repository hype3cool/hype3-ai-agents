'use client';

import React, { Fragment, useState } from 'react';
import { Dialog, DialogTitle, DialogPanel, Description, Transition, TransitionChild } from '@headlessui/react';
import { Z_INDEX } from '@/theme/zIndex';

export default function confirmDialog(message: string, open: any, setOpen: React.Dispatch<any>, callback: () => Promise<void>) {
    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" open={open} onClose={() => setOpen(false)} className="relative" style={{ zIndex: Z_INDEX.modal }}>
                <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-[black]/60" />
                </TransitionChild>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center px-4 py-8 ">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="panel w-full max-w-sm overflow-hidden rounded-lg border border-blue-400 border-opacity-20 p-0 text-black dark:text-white-dark bg-neutral-900 bg-opacity-90 shadow-inner">
                                <div className="p-4 md:p-5 text-center">
                                    <svg className="mx-auto mb-4 text-blue-200 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    <h3 className="mb-5 text-lg font-normal font-figtree text-white">{message}</h3>

                                    <div className="grid grid-cols-2 gap-4">
                                        <button type="button" data-modal-hide="popup-modal" className="hype3-btn-secondary hype3-bg-light-to-teal" onClick={callback}>
                                            Disconnect
                                        </button>

                                        <button type="button" data-modal-hide="popup-modal" className="hype3-btn-secondary hype3-bg-light-to-teal" onClick={() => setOpen(false)}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
