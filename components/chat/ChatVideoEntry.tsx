import React, { useEffect, useRef, useState } from 'react';

import { ILocalVideoTrack, IMicrophoneAudioTrack, IRemoteAudioTrack, IRemoteVideoTrack, LocalVideoTrack, RemoteVideoTrack } from 'agora-rtc-react';
import { User } from '@/types/types';

interface ChatVideoEntryProps {
    track: ILocalVideoTrack | IRemoteVideoTrack | undefined | null;
    user: User;
}

const ChatVideoEntry: React.FC<ChatVideoEntryProps> = ({ track, user }) => {
    const videoRef = useRef<HTMLDivElement | null>(null); // Reference for the video player

    useEffect(() => {
        if(track && videoRef.current)
        {
            track.play(videoRef.current);
            // Optional: Stop the track when the component is unmounted or the track changes
            return () => {
                track.stop();
            };
        }
    }, [track]);
    

    return (
        <div className="flex flex-col xl:flex-row items-start gap-y-2 sm:gap-x-4 py-2 relative mx-auto">
            {track != undefined && track != null && <div 
                ref={videoRef} 
                className="relative h-full w-full min-h-[280px] aspect-[16/9]"
                
                // style={{ width: "1280px", height: "720px", backgroundColor: "black" }} 
            >
                {/* This div will be used as the video container */}
            </div>}
        </div>
    );
};

export default ChatVideoEntry;
