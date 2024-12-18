'use client';
import { useEffect, useState } from 'react';

import { useChatRoom } from '@/hooks/useChatRoom';
import { Coin } from '@/types/types';
import IconLinkButton from '@/components/elements/buttons/IconLinkButton';
import CoinProfile from '../elements/CoinProfile';

import { showExplorer } from '@/utils/displayUtils';
import { ListenButton, OnlineMembersList, SpeakButton } from '@/components/chat/elements';

interface CoinAsideBarProps {
    coin: Coin;
}

const CoinAsideBar = ({ coin }: CoinAsideBarProps) => {
    const { canChat, activeConnections, isRoomJoined, isMuted, toggleCall, toggleMute } = useChatRoom();
    const [displayedUsers, setDisplayedUsers] = useState(false);

    const toggleActiveUsers = async () => {
        setDisplayedUsers(!displayedUsers);
    };

    return (
        <div className="relative h-full flex flex-col items-center justify-between bg-transparent">
            <div className="flex flex-col items-center mt-6">
                <CoinProfile coin={coin} />

                <div className="grid grid-cols-2 gap-2.5 mt-6">
                    {coin?.socials?.twitter?.url && <IconLinkButton icon="twitter" url={coin?.socials?.twitter?.url} />}
                    {coin?.socials?.telegram?.url && <IconLinkButton icon="telegram" url={coin?.socials?.telegram?.url} />}
                    {coin?.socials?.website?.url && <IconLinkButton icon="globe" url={coin?.socials?.website?.url} />}
                    {coin?.socials?.discord?.url && <IconLinkButton icon="discord" url={coin?.socials?.discord?.url} />}
                    {/* {coin?.mint && <IconLinkButton icon="expand" url={showExplorer(coin.mint)} />} */}
                </div>
            </div>
            {canChat && (
                <div className="flex flex-col gap-y-4.5 mb-6 w-full px-4">
                    {OnlineMembersList(activeConnections)}

                    <ListenButton isActive={isRoomJoined} onClick={toggleCall} />
                    {isRoomJoined && <SpeakButton isActive={!isMuted} onClick={toggleMute} />}
                </div>
            )}
        </div>
    );
};

export default CoinAsideBar;
