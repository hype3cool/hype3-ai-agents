'use client';

import React from 'react';
import AgoraRTC, { AgoraRTCProvider } from 'agora-rtc-react';

interface IProps {
    children?: React.ReactNode;
}

const ChatClientProvider = ({ children }: IProps) => {
    return <AgoraRTCProvider client={AgoraRTC.createClient({ codec: 'h264', mode: 'rtc' })}>{children}</AgoraRTCProvider>;
};

export default ChatClientProvider;
