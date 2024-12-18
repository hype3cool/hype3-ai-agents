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
import IconLinkButton from '@/components/elements/buttons/IconLinkButton';
import CoinDescription from './CoinDescription';
import { setMainDialog } from '@/store/slices/menu';
import { dispatch } from '@/store';

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

    // const handlePresale = async (e: React.MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault();

    //     if (status !== 'authenticated') {
    //         await login();
    //         return;
    //     }

    //     dispatch(setMainDialog({ open: true, type: 'presale', data: { coin } }));
    //     // setOpenPresaleDialog(true);
    // };

    const handlePresale = async () => {
        if (status !== 'authenticated') {
            await login();
            return;
        }

        dispatch(setMainDialog({ open: true, type: 'presale', data: coin }));
    };

    return (
        <div className="coin-card w-full relative rounded-lg shadow-inner">
            <div className="bg-transparent hover:bg-gradient-to-r from-green-400 via-blue-200 to-purple-400 p-[1px] rounded-lg ">
                <div className="w-full h-[335px] px-6 py-6 relative bg-black-100 rounded-lg shadow-inner flex flex-col justify-between">
                    <div className="flex flex-row space-x-5">
                        <img className="w-[100px] h-[100px] rounded-xl border-2 border-blue-200" src={coin?.imageUri || '/assets/images/token-default-avatar.jpeg'} />
                        <div className="flex flex-col justify-between">
                            <div>
                                <div className="text-white text-2xl font-medium font-figtree tracking-wide">{coin?.name}</div>
                                <div className="text-slate-400 text-sm font-semibold font-figtree tracking-tight">{coin?.symbol}</div>
                            </div>
                            <div className="items-center gap-2.5 inline-flex">
                                {coin?.socials?.twitter?.url && <IconLinkButton icon="twitter" url={coin?.socials?.twitter?.url} />}
                                {coin?.socials?.telegram?.url && <IconLinkButton icon="telegram" url={coin?.socials?.telegram?.url} />}
                                {coin?.socials?.website?.url && <IconLinkButton icon="globe" url={coin?.socials?.website?.url} />}
                                {coin?.socials?.discord?.url && <IconLinkButton icon="discord" url={coin?.socials?.discord?.url} />}
                            </div>
                        </div>
                    </div>
                    <div className="my-5">{coin?.description ? <CoinDescription description={coin?.description} /> : null}</div>

                    <div>
                        <div className=" text-blue-200 text-[10px] font-bold font-figtree uppercase leading-snug tracking-tight mb-1.5">DEV</div>
                        <div className="flex flex-row items-center gap-x-2.5">
                            <img className="w-[35px] h-[35px] rounded-full" src={coin?.creator?.image || '/assets/images/frog-avatar.png'} />
                            <div className=" text-blue-200 text-sm font-semibold font-figtree leading-snug">{coin?.creator?.username}</div>
                        </div>
                    </div>

                    <div className="flex justify-between gap-x-3.5">
                        <div className="flex justify-between flex-grow">
                            <div className="flex flex-row ">
                                <div className="flex flex-col">
                                    <div className=" text-blue-200 text-[10px] font-bold font-figtree uppercase leading-snug tracking-tight">RAISED</div>

                                    <div className="flex items-center">
                                        <div>
                                            <span className="text-white/90 text-base font-bold font-figtree leading-snug">85</span>
                                            <span className="text-slate-400/60 text-base font-bold font-figtree leading-snug"> SOL</span>
                                        </div>
                                        <div className="pl-3.5 relative">
                                            <div className="w-[140px] h-2.5 absolute bg-slate-400/20 rounded-[30px]" />
                                            <div className="w-[23px] h-2.5 bg-gradient-to-r from-[#0fffa3] via-blue-200 to-[#ec84ff] rounded-[30px]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="flex flex-col text-right">
                                <div className=" text-blue-200 text-[10px] font-bold uppercase font-figtree leading-snug tracking-tight">PRESALE ENDS IN</div>
                                <div className=" text-white/90 text-base font-bold font-figtree leading-snug">{coin?.createdAt && <CreationTimer createdAt={coin?.createdAt} />}</div>
                            </div> */}
                        </div>
                        <div>
                            <PresaleButton onClick={handlePresale} />
                        </div>
                    </div>
                </div>
            </div>
            {/* <PresaleDialog coin={coin} open={openPresaleDialog} setOpen={setOpenPresaleDialog} /> */}
        </div>
    );
};

export default CoinCard;

type PresaleButtonProps = {
    onClick: () => void;
};

const PresaleButton = ({ onClick }: PresaleButtonProps) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation(); // Prevent the hyperlink from being followed
        onClick();
    };

    return (
        <button
            onClick={(e) => handleClick(e)}
            className={`w-[136px] h-[38px] py-3.5 px-2 bg-slate-400/10 hover:bg-blue-200 text-white hover:text-black rounded-full text-nowrap inline-flex justify-center items-center gap-1 active:bg-blue-200 active:text-black cursor-pointer`}
        >
            <div className="text-center text-sm font-bold font-figtree leading-snug">BUY PRESALE</div> <span className="icon-arrows text-base" />
        </button>
    );
};
