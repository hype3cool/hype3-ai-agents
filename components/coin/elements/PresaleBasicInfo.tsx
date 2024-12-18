import { RefObject, useEffect, useState, Fragment } from 'react';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';

import BaseContainer from '@/components/layouts/BaseContainer';
import TokenProfileWithMarketInfo from '../elements/TokenProfileWithMarketInfo';
import { Coin } from '@/types/types';
import { Z_INDEX } from '@/theme/zIndex';
import CoinDescription from './CoinDescription';
import WalletAddressChip from '@/components/elements/chips/WalletAddressChip';

type PresaleBasicInfoBoxProps = {
    data: Coin;
    onHeaderHeightChange: (height: number) => void;
    headerRef: RefObject<HTMLDivElement>;
};

const PresaleBasicInfoBox = ({ data, onHeaderHeightChange, headerRef }: PresaleBasicInfoBoxProps) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        if (headerRef.current) {
            onHeaderHeightChange(headerRef.current.offsetHeight);
        }
    }, [headerRef, onHeaderHeightChange]);

    return (
        <BaseContainer>
            <div className="flex items-stretch justify-between w-full py-2 pr-1">
                <div className="flex items-start">
                    <img className="w-[60px] h-[60px] rounded-[5px]" loading="lazy" src={data?.imageUri || '/assets/images/token-default-avatar.jpeg'} alt={data?.name} />
                    <div className="ml-5 flex flex-col justify-between">
                        <div className="flex flex-row items-center">
                            <h3 className="base-white font-bold text-lg lg:text-[22px] mr-1">{data?.symbol}</h3>
                            <h4 className="base text-white/40 font-medium text-[14px] lg:text-[22px] mr-1">{data?.name}</h4>
                        </div>
                        <div className="flex flex-col items-start justify-start gap-1.5">
                            <WalletAddressChip address={`${data?.mint}`} prefix="CA:" />
                            <WalletAddressChip address={`${data?.solCollectionWallet}`} prefix="FUND:" />
                        </div>

                    </div>
                </div>
                <button className="flex items-center text-blue-200" onClick={() => setIsDialogOpen(true)}>
                    <span className="icon-arrow-down" />
                </button>
            </div>

            {/* Dialog for Token Description */}
            <Transition appear show={isDialogOpen} as={Fragment}>
                <Dialog as="div" open={isDialogOpen} onClose={() => setIsDialogOpen(false)} className="relative" style={{ zIndex: Z_INDEX.modal }}>
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
                                    <div className="p-4 md:p-5 flex flex-col items-center">
                                        <img className="w-[60px] h-[60px] rounded-[5px] mb-5" loading="lazy" src={data?.imageUri || '/assets/images/token-default-avatar.jpeg'} alt={data?.name} />

                                        <h3 className="text-lg font-normal font-figtree text-white text-left w-full">
                                            {data?.description ? <CoinDescription description={data.description} /> : null}
                                        </h3>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </BaseContainer>
    );
};

export default PresaleBasicInfoBox;