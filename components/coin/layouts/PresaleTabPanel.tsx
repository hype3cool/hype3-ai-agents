'use client';
import { Coin } from '@/types/types';
import React from 'react';
import { useSelector } from '@/store';

import CoinBasicProfile from '../elements/CoinBasicProfile';
import IconLinkButton from '@/components/elements/buttons/IconLinkButton';
import UserAvatar from '@/components/user/elements/UserAvatar';

import Link from 'next/link';

import { dispatch } from '@/store';
import { openSidePanel } from '@/store/slices/menu';

import MileStoneCard from '../elements/MileStoneCard';

type PresaleTabPanelProps = {
    coin: Coin;
};

const PresaleTabPanel = ({ coin }: PresaleTabPanelProps) => {
    // const { isSidePanelOpen } = useSelector((state: any) => state.menu);

    const handleOpenUserProfile = (user: any) => {
        dispatch(openSidePanel({ type: 'profile', data: user }));
    };

    const filterMilestones = (coin?.milestones && coin?.milestones.filter((milestone: any) => milestone.shortDescription && milestone.longDescription)) || [];

    return (
        <div className="px-8 pt-8">
            <div className="hidden lg:flex items-stretch justify-start flex-row">
                <CoinBasicProfile coin={coin} />
            </div>
            <div className="mt-6 gap-x-2.5 flex flex-row">
                {coin?.socials?.twitter?.url && <IconLinkButton icon="twitter" url={coin?.socials?.twitter?.url} />}
                {coin?.socials?.telegram?.url && <IconLinkButton icon="telegram" url={coin?.socials?.telegram?.url} />}
                {coin?.socials?.website?.url && <IconLinkButton icon="globe" url={coin?.socials?.website?.url} />}
                {coin?.socials?.discord?.url && <IconLinkButton icon="discord" url={coin?.socials?.discord?.url} />}
                {/* {coin?.mint && <IconLinkButton icon="expand" url={showExplorer(coin.mint)} />} */}
            </div>
            <div className="mt-10">
                <div className="text-blue-200 text-base font-semibold base-text">Creator</div>
                {coin?.creator && (
                    <div className="mt-5 flex flex-row justify-start items-center">
                        <UserAvatar user={coin?.creator} className="w-[60px] h-[60px] border-2 border-green-200" />
                        <div className="flex flex-col ml-4">
                            <button type="button" onClick={(e) => handleOpenUserProfile(coin?.creator)}>
                                <div className="text-blue-200 text-[22px] font-bold base-text mb-1">{coin?.creator?.username}</div>
                            </button>

                            {coin?.creator?.twitter && (
                                <Link href={`https://x.com/${coin?.creator?.twitter?.username}`} target="_blank">
                                    <div className="text-blue-200 text-sm font-semibold base-text">@{coin?.creator?.twitter?.username}</div>
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
            {filterMilestones.length > 0 && (
                <div className="my-10">
                    <div className="text-blue-200 text-base font-semibold base-text">Roadmap</div>
                    {filterMilestones.map((milestone, index) => (
                        <>{milestone?.shortDescription != '' ? <MileStoneCard key={index} milestone={milestone} coin={coin} /> : null}</>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PresaleTabPanel;
