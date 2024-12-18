import React from 'react';
import { Token } from '@/types/types';

import { dispatch } from '@/store';
import { openSidePanel } from '@/store/slices/menu';
import { useChatRoom } from '@/hooks/useChatRoom';
import LiveButton from './LiveButton';
import StreamModeButton from './StreamModeButton';
import ChatVideoEntry from './ChatVideoEntry';

type TokenSwapTabPanelProps = {
    data: Token;
};

const ChatStreamPanel = ({ data }: TokenSwapTabPanelProps) => {
    const handleOpenUserProfile = (user: any) => {
        dispatch(openSidePanel({ type: 'profile', data: user }));
    };

    const { isRoomJoined, isStreaming, startShare, stopShare, shareCameraMode, shareScreenMode, isScreenSharing, activeListeners } = useChatRoom();

    // 4.25rem - header
    // 40px - footer
    // 48px - tabs
    // 50px - action buttons
    return (
        <div className="flex flex-col h-[calc(100dvh-4.25rem-40px-48px-50px-32px)] md:px-4 lg:px-8 pt-6">
            <div className=" flex-grow relative">
                <div className="flex items-center justify-center">
                    {activeListeners.map((listener, index) => listener.user && <ChatVideoEntry track={listener.videoTrack} user={listener.user} key={index} />)}
                </div>
            </div>

            <div className="flex flex-row justify-between p-4">
                <LiveButton isActive={isRoomJoined && isStreaming} onActiveClick={stopShare} onInactiveClick={startShare} />
                {isRoomJoined && isStreaming && <StreamModeButton cameraMode={!isScreenSharing} onCameraModeClick={shareCameraMode} onScreenModeClick={shareScreenMode} />}
            </div>
        </div>
    );
};

export default ChatStreamPanel;
