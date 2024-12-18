'use client';

import React, { useState, useRef, useEffect } from 'react';
import { TabGroup, TabPanel, TabPanels } from '@headlessui/react';

import { Coin, User } from '@/types/types';

import { dispatch, IRootState, useSelector } from '@/store';

import { useChatRoom } from '@/hooks/useChatRoom';


import LoadingSpinner from '@/components/elements/LoadingSpinner';
import MainTabList from '@/components/layouts/tab/MainTabList';


import { openSidePanel } from '@/store/slices/menu';
import SwapTabPanel from './SwapTabPanel';
import TransactionTabPanel from './TransactionTabPanel';

import TokenBasicBox from '../elements/TokenBasicBox';
import ChatRoomButton from '@/components/chat/ChatRoomButton';
import ChatPanel from '@/components/chat/ChatPanel';
import ChatAudioSpace from '@/components/chat/ChatAudioSpace';
import ChatViewCover from '@/components/chat/ChatViewCover';
import TwitterTimeline from '../elements/TwitterTimeline';

const categories = [
    {
        name: 'Chat',
    },
    {
        name: 'Swap',
    },
    {
        name: 'Transactions',
    },
    {
        name: 'X Feed',
    },
];

type CoinTabViewInMobileProps = {
    data: Coin;
};

const CoinTabViewInMobile = ({ data }: CoinTabViewInMobileProps) => {
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const { activeConnections, canChat, isBalanceLoading } = useChatRoom();

    const [selectedIndex, setSelectedIndex] = useState(0);

    const twitterUrl = data?.socials?.twitter?.url || '';

    const headerRef = useRef<HTMLDivElement>(null);
    const [headerHeight, setHeaderHeight] = useState<number>(0);

    const handleHeaderHeightChange = (newHeight: number) => {
        setHeaderHeight(newHeight);
    };

    useEffect(() => {
        const handleResize = () => {
            if (headerRef.current) {
                setHeaderHeight(headerRef.current.offsetHeight);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial calculation

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const [showChatRoom, setShowChatRoom] = useState(true); // toggle between chat room and audio space (mobile view only)

    const handleOnlineUserList = (users: User[]) => {
        dispatch(openSidePanel({ type: 'online-user', data: users }));
    };

    return (
        <div className="relative">
            <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex} className="absolute w-full">
                <div ref={headerRef} className="fixed z-50 w-full bg-black">
                    <TokenBasicBox data={data} onHeaderHeightChange={handleHeaderHeightChange} headerRef={headerRef} />
                    <div className="border-t border-b border-white/10 bg-blue-200/5 overflow-x-auto">
                        <MainTabList categories={categories} />
                    </div>
                </div>
                
                <TabPanels className="overflow-hidden" style={{ marginTop: `${headerHeight}px` }}>      {/* className="relative" */}
                    <TabPanel className="tab-panel-0">
                        <div className="sticky top-0 z-10 bg-black w-full flex flex-row items-center justify-between px-main py-3">    {/* overflow-hidden */}
                            <button className="flex flex-row items-center justify-start gap-x-2" onClick={() => handleOnlineUserList(activeConnections)}>
                                <span className="icon-users text-blue-200" />
                                {/* <h6 className="text-blue-200 font-semibold">{activeConnections.length} online</h6> */}
                            </button>
                            {canChat && <ChatRoomButton isActive={showChatRoom} onClick={() => setShowChatRoom(!showChatRoom)} label={showChatRoom ? 'Audio Space' : 'Chatroom'} size="small" />}
                        </div>

                        {/* chat body */}
                        <div className="p-0 lg:p-4 relative">
                            {canChat ? (
                                <>
                                    {showChatRoom ? (
                                        <ChatPanel
                                            coin={data}
                                            isMobile={true}
                                            // className={`top-[${headerHeight}px]`}
                                            className={`${themeConfig.topAlertBar ? 'h-[calc(100dvh-6.125rem-40px)]' : 'h-[calc(100dvh-10.5rem-40px)] lg:h-[calc(100dvh-3rem-40px)]'}`}
                                        />
                                    ) : (
                                        <ChatAudioSpace className={`${themeConfig.topAlertBar ? 'h-[calc(100dvh-6.125rem-40px)]' : 'h-[calc(100dvh-10.5rem-40px)] lg:h-[calc(100dvh-3rem-40px)]'}`} />
                                    )}
                                </>
                            ) : (
                                <>{isBalanceLoading ? <LoadingSpinner className="p-14" /> : <ChatViewCover data={data} />}</>
                            )}
                        </div>
                    </TabPanel>
                    <TabPanel className="tab-panel-1">
                        <div className="p-4">
                            <SwapTabPanel data={data} />
                        </div>
                    </TabPanel>
                    <TabPanel className="tab-panel-2">
                        <TransactionTabPanel data={data} />
                    </TabPanel>
                    <TabPanel className="tab-panel-3">
                        <div className="p-2 lg:p-4">
                            <TwitterTimeline username={twitterUrl.split('/')[3]} />
                        </div>
                    </TabPanel>
                </TabPanels>
                {/* </div> */}
            </TabGroup>
        </div>
    );
};

export default CoinTabViewInMobile;
