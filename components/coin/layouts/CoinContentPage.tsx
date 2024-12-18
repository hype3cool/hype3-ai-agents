'use client';
import React, { useEffect } from 'react';

import LoadingSpinner from '@/components/elements/LoadingSpinner';

import { Coin } from '@/types/types';
import { IRootState, useDispatch, useSelector } from '@/store';
import { setCurrentCoin } from '@/store/slices/coin';

import { useChatRoom } from '@/hooks/useChatRoom';

import CoinTabViewInMobile from './CoinTabViewInMobile';
import PresaleTabView from './PresaleTabView';
import CoinTabView from '@/components/coin/layouts/CoinTabView';
import ChatViewCover from '@/components/chat/ChatViewCover';

import ChatPanel from '@/components/chat/ChatPanel';
import { useSession } from 'next-auth/react';
import { useCoinData } from '../CoinDataProvider';
import CoinAsideBar from './CoinAsideBar';
import PresaleTabViewInMobile from './PresaleTabViewInMobile';
// import usePresaleUpdates from '@/hooks/usePresaleUpdates';

interface CoinContentPageProps {
    coin: Coin;
}

const CoinContentPage = ({ coin }: CoinContentPageProps) => {
    const dispatch = useDispatch();
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);

    const { data: session, status } = useSession();
    const { checkPresalePaid } = useCoinData();
    const { canChat, isBalanceLoading, setCanChat } = useChatRoom();

    useEffect(() => {
        dispatch(setCurrentCoin(coin));
    }, [coin]);

    useEffect(() => {
        if (status === 'authenticated') {
            checkPresalePaid();
        }
    }, [status]);

    return (
        <div>
            <div
                className={`hidden lg:block fixed z-20 inset-0 ${themeConfig.topAlertBar ? 'top-[6.125rem]' : 'top-[3rem] lg:top-[4.25rem]'} bottom-[40px] right-auto w-[9.375rem] overflow-y-auto
                    border-r border-white/10`}
            >
                <CoinAsideBar coin={coin} />
            </div>
            <div className="lg:pl-[9.375rem]">
                <div className="lg:w-1/2">
                    <div className={`relative ${themeConfig.topAlertBar ? 'mt-[6.125rem]' : 'mt-[3rem] lg:mt-[4.25rem]'}`}>
                        <div className="lg:hidden">{coin.isCreated ? <CoinTabViewInMobile data={coin} /> : <PresaleTabViewInMobile data={coin} />}</div>
                        <div className="hidden lg:block relative">
                            {canChat ? (
                                <ChatPanel coin={coin} className={`${themeConfig.topAlertBar ? 'h-[calc(100dvh-6.125rem-40px)]' : 'h-[calc(100dvh-11.5rem-40px)] lg:h-[calc(100dvh-4.25rem-40px)]'}`} />
                            ) : (
                                <>{isBalanceLoading ? <LoadingSpinner className="p-14" /> : <ChatViewCover data={coin} />}</>
                            )}
                        </div>
                    </div>
                    {coin?.isCreated ? (
                        <div
                            className={`fixed z-20 ${themeConfig.topAlertBar ? 'top-[6.125rem]' : 'top-[3rem] lg:top-[4.25rem]'} right-0 lg:w-[calc((100%-150px)/2)] hidden lg:block border-l border-white/10`}
                        >
                            <CoinTabView data={coin} />
                        </div>
                    ) : (
                        <div
                            className={`fixed z-20 ${themeConfig.topAlertBar ? 'top-[6.125rem]' : 'top-[3rem] lg:top-[4.25rem]'} right-0 lg:w-[calc((100%-150px)/2)] hidden lg:block border-l border-white/10`}
                        >
                            <PresaleTabView data={coin} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CoinContentPage;
