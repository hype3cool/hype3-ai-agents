'use client';
import React, { useState } from 'react';


import CircularProgress from './CircularProgress';

import PresaleDialog from '@/components/elements/dialogs/PresaleDialog';
import PresaleTimer from '@/components/elements/PresaleTimer';
import CreationTimer from '@/components/elements/CreationTimer';

import { useAuth } from '@/components/auth/AuthProvider';
import { Coin } from '@/types/types';

import CoinAvatar from './CoinAvatar';
import { useSession } from 'next-auth/react';
import useCoin from '@/hooks/useCoin';
import NoMilestoneDescription from './NoMilestoneDescription';

type CoinCardProps = {
    coin: Coin;
};

const CoinCard = ({ coin }: CoinCardProps) => {
    const { status } = useSession();

    const { login } = useAuth();
    const { balance, percentage } = useCoin(coin?.solCollectionWallet);
    const [openPresaleDialog, setOpenPresaleDialog] = useState<any>(false);

    const isPresaleEnded = !!coin?.presaleEndAt && new Date(coin?.presaleEndAt) < new Date();
    // const isPresaleEnded = true;

    const handlePresale = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (status !== 'authenticated') {
            await login();
            return;
        }

        setOpenPresaleDialog(true);
    };

    return (
        <div className="coin-card w-full relative bg-blue-200/10 rounded-lg shadow-inner">
            <div className="bg-transparent hover:bg-gradient-to-r from-green-400 via-blue-200 to-purple-400 p-[1px] rounded-lg">
                <div className="h-full w-full relative bg-black-100 rounded-lg shadow-inner">
                    <div className="flex flex-col justify-between">
                        <div className="py-4.5 px-5 flex justify-between border-b border-dashed border-white/10">
                            <div className="flex items-start">
                                <CoinAvatar coin={coin} />
                                <div className="ml-3.5 flex flex-col justify-between">
                                    <div className="base text-white/90 font-semibold text-lg lg:text-[22px] mr-1">{coin?.symbol}</div>
                                    <div className="text-white/50 text-sm font-medium">{coin?.name}</div>
                                </div>
                            </div>
                            <div className="flex">
                                <CircularProgress progress={percentage} size={50} strokeWidth={3} />
                            </div>
                        </div>
                        <div className="flex flex-col pt-[11px]">
                            <div className="price-tag-groups flex justify-between px-5">
                                <div className="text-left w-1/3">
                                    <div className="base text-blue-400 text-[10px] font-bold uppercase">RAISED</div>
                                    <div>
                                        <span className="base text-white/90 text-base font-bold">{balance} </span>
                                        <span className="base text-white/40 text-base font-bold">SOL</span>
                                    </div>
                                </div>

                                <div className="text-right w-1/3">
                                    <div className="base text-blue-400 text-[10px] font-bold uppercase">CREATED</div>
                                    {coin?.createdAt && <CreationTimer createdAt={coin?.createdAt} />}
                                </div>
                            </div>
                            <div className="relative flex flex-col items-center justify-center w-full h-[128px] bg-white rounded-lg shadow-none mt-4.5">
                                <div className="absolute inset-0 bg-black rounded-tl-lg rounded-tr-lg border-t border-blue-200">
                                    <div className="flex flex-row h-full w-full bg-black rounded-lg p-5">
                                        <div className="relative w-9 h-9 min-w-9 rounded-full overflow-hidden border border-transparent bg-gradient-to-r from-green-400 via-blue-200 to-purple-400">
                                            <img src={coin?.creator?.image || '/assets/images/frog-avatar.png'} alt="img" className="h-9 w-9 rounded-full object-cover" />
                                            <img loading="lazy" className="w-full h-full object-cover" src={'/assets/images/avatar11.png'} />
                                        </div>
                                        <div className="pl-4">{coin?.creator && <NoMilestoneDescription creator={coin?.creator} />}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {isPresaleEnded ? (
                            <div className="bg-white/25 rounded-bl-lg rounded-br-lg w-full">
                                <div className="flex justify-center items-center py-3 text-white/50 text-base font-bold font-figtree">Ended & Refunded</div>
                            </div>
                        ) : (
                            <button
                                type="button"
                                className="h-gradient rounded-bl-lg rounded-br-lg w-full shadow-none border-none"
                                onClick={(e) => {
                                    handlePresale(e);
                                }}
                            >
                                <div className="flex justify-center items-center py-3">
                                    {coin?.presaleEndAt && (
                                        <PresaleTimer presaleEndAt={coin?.presaleEndAt} className="text-center text-black text-base font-bold font-figtree" wrapText={`Buy Presale (Ends in % ⏳)`} />
                                    )}
                                </div>
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <PresaleDialog coin={coin} open={openPresaleDialog} setOpen={setOpenPresaleDialog} />
        </div>
    );
};

export default CoinCard;
