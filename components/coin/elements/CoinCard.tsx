'use client';
import React, { useState, useEffect, useMemo } from 'react';

import CircularProgress from './CircularProgress';

import PresaleDialog from '@/components/elements/dialogs/PresaleDialog';
import PresaleTimer from '@/components/elements/PresaleTimer';
import TimerText from '@/components/elements/TimerText';

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
import { TARGET_FUNDING_AMOUNT } from '@/constants/constants';
import { useForceUpdate } from '@/hooks/useForceUpdate';

type CoinCardProps = {
    coin: Coin;
};

const CoinCard = ({ coin }: CoinCardProps) => {
    const { status } = useSession();

    const { login } = useAuth();
    const { balance, percentage } = useCoin(coin?.solCollectionWallet);
    const [openPresaleDialog, setOpenPresaleDialog] = useState<any>(false);

    const forceUpdate = useForceUpdate();

    const [isPresaleStarted, setIsPresaleStarted] = useState(false);
    const [isPresaleEnded, setIsPresaleEnded] = useState(false);

    const presaleStartAt = useMemo(() => (coin?.presaleStartAt ? new Date(coin.presaleStartAt) : null), [coin]);
    const presaleEndAt = useMemo(() => (coin?.presaleEndAt ? new Date(coin.presaleEndAt) : null), [coin]);

    useEffect(() => {
        const checkPresaleStatus = () => {
            const now = new Date();

            const started = presaleStartAt ? presaleStartAt < now : false;
            const ended = presaleEndAt ? presaleEndAt < now : false;

            setIsPresaleStarted(started);
            setIsPresaleEnded(ended);

            // Force re-render if the presale status changes
            forceUpdate();
        };

        // Check the status immediately
        checkPresaleStatus();

        // Determine the interval frequency
        const intervalFrequency = () => {
            const now = new Date();
            if (presaleStartAt && presaleEndAt) {
                const timeToStart = presaleStartAt.getTime() - now.getTime();
                const timeToEnd = presaleEndAt.getTime() - now.getTime();
                if (timeToStart <= 10000 || timeToEnd <= 10000) {
                    return 1000; // Check every second if within 10 seconds of start or end
                }
            }
            return 60000; // Check every minute otherwise
        };

        // Set up an interval to check the status
        const intervalId = setInterval(checkPresaleStatus, intervalFrequency());

        // Clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [presaleStartAt, presaleEndAt, forceUpdate]);

    const handlePresale = async () => {
        if (status !== 'authenticated') {
            await login();
            return;
        }

        dispatch(setMainDialog({ open: true, type: 'presale', data: coin }));
    };

    // <div className="w-[420px] h-[335px] relative bg-slate-400/5 rounded-lg shadow-[inset_0px_3px_5.400000095367432px_-2px_rgba(255,255,255,0.04)] shadow-[inset_0px_0.36217600107192993px_0.6519169807434082px_-1px_rgba(255,255,255,0.02)] border border-slate-400/20 overflow-hidden">

    return (
        <div
            className="coin-card w-full h-[335px] relative bg-slate-400/5 rounded-lg border border-slate-400/20 overflow-hidden card-wrapper"
            // style={{
            //     boxShadow: '0px 0.362px 0.652px -1px rgba(255, 255, 255, 0.02) inset, 0px 3px 5.4px -2px rgba(255, 255, 255, 0.04) inset',
            // }}
        >
            <div className="card-content">
                <div className="px-6 py-6 bg-bluegray-500/5 hover:bg-bluegray-500/10 overflow-hidden h-full flex flex-col justify-between relative">
                    <div>
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

                        <div className="my-5 h-10">{coin?.description ? <CoinDescription description={coin?.description} /> : null}</div>

                        <div>
                            <div className=" text-blue-200 text-[10px] font-bold font-figtree uppercase leading-snug tracking-tight mb-1.5">DEV</div>
                            <div className="flex flex-row items-center gap-x-2.5">
                                <img className="w-[35px] h-[35px] rounded-full" src={coin?.creator?.image || '/assets/images/frog-avatar.png'} />
                                <div className=" text-blue-200 text-sm font-semibold font-figtree leading-snug">{coin?.creator?.username}</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between gap-x-3.5 pt-[23px]">
                        <div className="flex justify-between flex-grow">
                            <div className="flex flex-row ">
                                <div className="flex flex-col">
                                    <div className=" text-blue-200 text-[10px] font-bold font-figtree uppercase leading-snug tracking-tight">RAISED</div>

                                    <div className="flex items-center">
                                        <div>
                                            <span className="text-white/90 text-base font-bold font-figtree leading-snug">{isPresaleStarted ? TARGET_FUNDING_AMOUNT : '--'}</span>
                                            <span className="text-slate-400/60 text-base font-bold font-figtree leading-snug"> SOL</span>
                                        </div>
                                        {isPresaleStarted && (
                                            <div className="pl-3.5 relative">
                                                <div className="w-[140px] h-2.5 absolute bg-slate-400/20 rounded-[30px]" />
                                                <div className="h-2.5 bg-gradient-to-r from-[#0fffa3] via-blue-200 to-[#ec84ff] rounded-[30px]" style={{ width: `${1 / TARGET_FUNDING_AMOUNT}%` }} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {!isPresaleStarted ? (
                                <div className="flex flex-col text-right">
                                    <div className=" text-blue-200 text-[10px] font-bold uppercase font-figtree leading-snug tracking-tight">PRESALE STARTS IN</div>
                                    <div className=" text-white/90 text-base font-bold font-figtree leading-snug">{coin?.presaleStartAt && <TimerText endAt={new Date(coin?.presaleStartAt)} />}</div>
                                </div>
                            ) : (
                                <PresaleButton onClick={handlePresale} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
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
