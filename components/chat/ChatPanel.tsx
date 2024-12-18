'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

import { useChatRoom } from '@/hooks/useChatRoom';
import NewSendMessageBox from './NewSendMessageBox';

import { Coin } from '@/types/types';
import ChatAudioEntry from './ChatAudioEntry';
import ChatMessageRow from './ChatMessageRow';

type ChatPanelProps = {
    className: string;
    coin?: Coin;
    isMobile?: boolean;
};

const ChatPanel = ({ className, coin, isMobile = false }: ChatPanelProps) => {
    const pathname = usePathname();
    const isSolana = pathname === '/solana';

    const { isRoomJoined, activeListeners, messages, shouldScroll, setShouldScroll, loadPreviousMessage } = useChatRoom();

    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const lastMessageRowRef = useRef<HTMLDivElement>(null);

    const [showScrollToBottomButton, setShowScrollToBottomButton] = useState<boolean>(false);
    const [previousScrollHeight, setPreviousScrollHeight] = useState<number>(0);

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (messagesContainerRef.current) {
                const scrollTop = messagesContainerRef.current.scrollTop;

                // If scrollTop is 0, user is at the top of the scrollable area
                if (scrollTop === 0) {
                    // Save the current scroll height before loading more messages
                    setPreviousScrollHeight(messagesContainerRef.current.scrollHeight);

                    // Load previous messages here
                    loadPreviousMessage(messages[0]?._id ?? '');
                }

                const scrollHeight = messagesContainerRef.current.scrollHeight;
                const clientHeight = messagesContainerRef.current.clientHeight;
                const lastMessageHeight = lastMessageRowRef.current?.scrollHeight ?? 0;

                // Show button if not at the bottom
                const atBottom = scrollTop + clientHeight >= scrollHeight - lastMessageHeight;
                setShowScrollToBottomButton(!atBottom);
            }
        };

        const container = messagesContainerRef.current;
        container?.addEventListener('scroll', handleScroll);

        return () => {
            container?.removeEventListener('scroll', handleScroll);
        };
    }, [messages, messagesContainerRef, lastMessageRowRef]);

    useEffect(() => {
        if (shouldScroll) {
            setShouldScroll(false);
            scrollToBottom(); // scroll to bottom when new message is sent
        } else if (messagesContainerRef.current) {
            // Adjust scroll position after loading old messages
            const newScrollHeight = messagesContainerRef.current.scrollHeight;
            messagesContainerRef.current.scrollTop = newScrollHeight - previousScrollHeight;
        }
    }, [messages]);

    const [volumeThreshold, setVolumeThreshold] = useState<number>(0.5);

    return (
        <div className={`chat-panel-container overflow-hidden relative ${className}`}>
            <div className="flex flex-col h-full">
                {isRoomJoined && !isMobile && (
                    <div>
                        <div className="hidden w-full lg:flex flex-row justify-start items-center bg-transparent py-2 gap-x-2.5 border-b border-white/10 px-main">
                            <span className="rounded-full w-3 h-3 bg-blue-200 ripple teal" />
                            <h6 className="base-white font-semibold">
                                You are listening to the <span className="text-blue-200">{coin?.symbol ?? '$SOL'}</span> channel
                            </h6>
                        </div>
                        <div className="w-full flex flex-row justify-start bg-transparent py-2 p-1 gap-x-2.5 border-b border-white/10">
                            {activeListeners.map((listener, index) => listener.user && <ChatAudioEntry track={listener.track} user={listener.user} threshold={volumeThreshold} key={index} />)}
                        </div>
                    </div>
                )}

                <div className="message-container flex-grow overflow-y-auto w-full px-main" ref={messagesContainerRef}>
                    <div className="chat-message-container py-2.5 flex flex-col">
                        {messages.map((message, index) => (
                            <ChatMessageRow key={`chat${index + 1}`} message={message} coin={coin} ref={index === messages.length - 1 ? lastMessageRowRef : null} />
                        ))}
                    </div>
                </div>
                {showScrollToBottomButton && (
                    <div className={`absolute w-full px-2.5 pb-2.5 ${isSolana ? 'bottom-16' : 'bottom-[118px] lg:bottom-16'}`} style={{ zIndex: 1000 }}>
                        <div className="bg-black">
                            <button className="w-full bg-blue-200/70 rounded-[3px] h-6 px-2 py-1 flex items-center justify-end sm:justify-between text-right" onClick={scrollToBottom}>
                                <div className="base-white text-sm font-bold hidden sm:block">You are viewing older messages</div>
                                <div className="base-white text-sm font-bold w-full sm:w-auto">
                                    Jump to Present <span className="icon-arrow-down text-xs ml-1" />
                                </div>
                            </button>
                        </div>
                    </div>
                )}

                <div className={`sticky bottom-0 z-10 px-main ${isSolana ? 'pb-0' : 'pb-[56px]'} lg:pb-0 lg:h-[68px] border-t border-white/10 flex items-center w-full`}>
                    <NewSendMessageBox />
                </div>
            </div>
        </div>
    );
};

export default ChatPanel;
