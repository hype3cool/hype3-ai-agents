'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';

// agora
import { ConnectionDisconnectedReason, ConnectionState, useClientEvent, useConnectionState, useRTCClient } from 'agora-rtc-react';

import { useChatRoom } from '@/hooks/useChatRoom';
import ChatAudioEntry from './ChatAudioEntry';
import ListenButton from './elements/ListenButton';
import SpeakButton from './elements/SpeakButton';

type ChatAudioSpaceProps = {
    className: string;
};

const ChatAudioSpace = ({ className }: ChatAudioSpaceProps) => {
    const pathname = usePathname();
    const isSolana = pathname === '/solana';

    const { isRoomJoined, activeListeners, isMuted, toggleCall, toggleMute } = useChatRoom();

    // status of the agora connection
    const [currentConnectionStatus, setCurrentConnectionStatus] = useState('DISCONNECTED');
    const client = useRTCClient();
    useClientEvent(client, 'connection-state-change', (curState: ConnectionState, revState: ConnectionState, reason?: ConnectionDisconnectedReason) => {
        setCurrentConnectionStatus(curState + (reason ? ' | ' + reason : ''));
    });

    return (
        <div className={`flex flex-col justify-between overflow-hidden relative ${className}`}>
            <div className="flex-grow overflow-y-auto w-full px-main">
                {isRoomJoined && (
                    <div className="flex flex-wrap justify-center py-2 p-1 gap-4">
                        {activeListeners.map((listener, index) => listener.user && <ChatAudioEntry track={listener.track} user={listener.user} key={index} />)}
                    </div>
                )}
            </div>
            {!isRoomJoined && (
                <div className="flex flex-col px-main pb-3.5">
                    <div className="relative">
                        <svg className="notify-arrows">
                            <path className="a1" d="M0 0 L30 32 L60 0"></path>
                            <path className="a2" d="M0 20 L30 52 L60 20"></path>
                            <path className="a3" d="M0 40 L30 72 L60 40"></path>
                        </svg>
                    </div>
                    <div className="flex flex-row justify-center">
                        <h6 className="base text-blue-200 font-semibold">Please click “Listen” below to join the audio space.</h6>
                    </div>
                </div>
            )}

            <div className={`status-container px-main ${isSolana ? 'pb-3' : 'pb-[64px]'} lg:pb-0 lg:h-[68px] border-t border-white/10 flex items-center justify-between w-full  gap-x-2.5 py-2.5`}>
                <div className="base-text text-white/50 text-[10px] font-semibold">{currentConnectionStatus}</div>
                <div className="flex items-center gap-x-2.5">
                    <ListenButton isActive={isRoomJoined} onClick={toggleCall} size="small" />
                    {isRoomJoined && (
                        <div className="relative">
                            <SpeakButton isActive={!isMuted} onClick={toggleMute} size="small" />
                            <div className="absolute top-0 right-0 -mt-1 -mr-1 w-3 h-3 bg-red-500 rounded-full"></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatAudioSpace;
