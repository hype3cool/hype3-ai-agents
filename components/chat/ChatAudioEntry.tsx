import React, { useEffect, useState } from 'react';

import { IMicrophoneAudioTrack, IRemoteAudioTrack } from 'agora-rtc-react';
import { User } from '@/types/types';

import { dispatch } from '@/store';
import { openSidePanel } from '@/store/slices/menu';

import styles from './ChatAudioEntry.module.css';
import TwitterBadge from '../elements/TwitterBadge';

interface ChatAudioEntryProps {
    track: IMicrophoneAudioTrack | IRemoteAudioTrack | undefined | null;
    user: User;
    threshold?: number;
}

const ChatAudioEntry: React.FC<ChatAudioEntryProps> = ({ track, user, threshold = 0.58 }) => {
    const handleOpenUserProfile = (user: any) => {
        dispatch(openSidePanel({ type: 'profile', data: user }));
    };

    const [volume, setVolume] = useState(0);

    useEffect(() => {
        if (track != undefined && track != null) {
            const intervalId = setInterval(() => {
                const newVolume = track.getVolumeLevel(); // Get the latest volume from a provided function
                setVolume(newVolume);
            }, 1000); // Update every second

            return () => clearInterval(intervalId); // Cleanup on component unmount
        } else {
            setVolume(0);
        }

        console.log(track);
    }, [track]);

    return (
        <div className="flex flex-col xl:flex-row items-start gap-y-2 sm:gap-x-4 py-2">
            <div className="flex flex-col items-center gap-x-2 flex-shrink-0 text-white w-[130px] max-w-[130px]">
                {track != undefined && track != null && ((track as IMicrophoneAudioTrack)?.enabled || (track as IRemoteAudioTrack)?.isPlaying) ? (
                    <button type="button" onClick={() => handleOpenUserProfile(user)}>
                        <img
                            src={user?.image || '/assets/images/frog-avatar.png'}
                            alt="img"
                            className={`h-10 w-10 rounded-full border border-black object-cover ${volume > threshold && 'ripple teal two'}`}
                        />
                    </button>
                ) : (
                    <div className={`relative rounded-full`}>
                        <img src={user?.image || '/assets/images/frog-avatar.png'} alt="img" className="h-10 w-10 rounded-full border border-black object-cover" />

                        <button onClick={() => handleOpenUserProfile(user)} className={`absolute inset-0 flex items-center justify-center rounded-full opacity-100 bg-black/70`}>
                            <span className="icon-mic-off2 text-blue-200/50" />
                        </button>
                    </div>
                )}

                <div className="flex flex-row items-center gap-x-2 flex-shrink-1 mt-4 mb-1.5">
                    <button type="button" className="flex flex-row items-center gap-x-2 flex-shrink-1" onClick={() => handleOpenUserProfile(user)}>
                        <h6 className={`text-white font-semibold ${styles.username}`}>{user?.username}</h6>
                    </button>
                </div>
                {user?.twitter && user?.twitter?.name && user?.twitter?.username && <TwitterBadge username={user?.twitter?.username} />}
            </div>
        </div>
    );
};

export default ChatAudioEntry;
