'use client';

import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { Z_INDEX } from '@/theme/zIndex';

// redux
import { dispatch, useSelector } from '@/store';
import { IRootState } from '@/store';
import { closeHowToHype } from '@/store/slices/themeConfigSlice';

// style
import styles from './HowToHypeWelcomeDialog.module.css';
import Link from 'next/link';

const HowToHypeWelcomeDialog = () => {
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const [showDialog, setShowDialog] = useState(false);

    const handleClose = () => {
        dispatch(closeHowToHype());
        setShowDialog(false); // Close the dialog when the button is clicked
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowDialog(true);
        }, 1000); // Show dialog after 1 second

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, []);

    return (
        <Transition appear show={themeConfig.howToHype && showDialog} as={Fragment}>
            <Dialog as="div" open={themeConfig.howToHype && showDialog} onClose={() => {}} className="relative" style={{ zIndex: Z_INDEX.modal }}>
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
                            <DialogPanel className="p-1 w-full max-w-lg rounded-[20px] flex items-center justify-center relative overflow-hidden">
                                {/* Animated border elements */}
                                <div className={styles['animated-border-box-glow']}></div>
                                <div className={styles['animated-border-box']}></div>

                                {/* Dialog content */}
                                <div className="px-4 pb-6 text-center flex flex-col justify-start items-center relative z-1100 bg-black rounded-[20px]">
                                    <div className="base-white text-center text-2xl font-semibold my-9">GM fam 🩵</div>

                                    <div
                                        className="mb-5 max-h-[300px] overflow-y-auto"
                                        style={{
                                            scrollbarWidth: 'thin',
                                            scrollbarColor: 'transparent transparent',
                                        }}
                                    >
                                        <span className="base-white text-base font-normal">
                                            HYPE3 protects projects & their community, gives tokens a better start and also split fees with the creators.
                                        </span>

                                        <ul className="base-white text-base font-normal list-none space-y-3 mt-3">
                                            <li>
                                                <p>1. create a free token launch w/o gas fee</p>
                                            </li>
                                            <li>
                                                <p>2. bot-free presale (get in at same price)</p>
                                            </li>
                                            <li>
                                                <p>
                                                    3. guaranteed refunds (85 <span className="underline">$SOL</span> raised or token cancelled)
                                                </p>
                                            </li>
                                            <li>
                                                <p>4. 100% funds go straight to Raydium LP (minus fees) </p>
                                            </li>
                                            <li>
                                                <Link href="https://hype3.gitbook.io/hype3/" target='_blank'>
                                                    <p className="underline">Read more</p>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>

                                    <button
                                        type="button"
                                        className="px-5 py-[9px] rounded-[18px] h-10 min-h-10 whitespace-nowrap gap-2.5 text-base font-bold !bg-blue-400/10 border border-transparent hover:bg-blue-200/20 hover:border-blue-200 transition-all delay-100 text-blue-200"
                                        onClick={() => handleClose()}
                                    >
                                        LFG! lets go
                                    </button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default HowToHypeWelcomeDialog;
