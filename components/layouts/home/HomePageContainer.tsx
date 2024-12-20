'use client';
import React from 'react';

// ui
import StartTokenButton from '@/components/elements/buttons/StartTokenButton';

import CoinList from '@/components/coin/layouts/CoinList';

import JoinAsCreatorLinkButton from '@/components/elements/buttons/JoinAsCreatorLinkButton';
import ImageCarousel from './ImageCarousel';
import LottieGroup from './LottieGroup';
import { TempCreatorData } from '@/types/types';


const creators: TempCreatorData[] = [
    {
        name: 'philb',
        username: 'PhillipBankss',
        image: '/assets/images/creator_400x400_1.jpg',
        agentCount: 106,
        earned: 30400,
        twitterUrl: 'https://x.com/PhillipBankss',
    },
    {
        name: 'Elon Musk',
        username: 'elonmusk',
        image: '/assets/images/creator_400x400_2.jpg',
        agentCount: 12,
        earned: 8000,
        twitterUrl: 'https://x.com/elonmusk',
    },
    {
        name: 'Ansem 🐂🀄️',
        username: 'blknoiz06',
        image: '/assets/images/creator_400x400_3.jpg',
        agentCount: 5,
        earned: 2010,
        twitterUrl: 'https://x.com/blknoiz06',
    },
    {
        name: 'toly 🇺🇸',
        username: 'aeyakovenko',
        image: '/assets/images/creator_400x400_4.jpg',
        agentCount: 3,
        earned: 1031,
        twitterUrl: 'https://x.com/aeyakovenko',
    },
    {
        name: 'mert | helius.dev',
        username: '0xMert_',
        image: '/assets/images/creator_400x400_5.jpg',
        agentCount: 1,
        earned: 900,
        twitterUrl: 'https://x.com/0xMert_',
    },
];

const HomePageContainer = () => {
    return (
        <div>
            <div className="flex flex-col items-center">
                <div className="relative w-full h-[300px] flex items-center justify-center">
                    <LottieGroup />
                </div>
                <StartTokenButton />
                <JoinAsCreatorLinkButton />
            </div>

            <div className="relative py-[80px] flex flex-col">
                <div className="text-white text-[20px] sm:text-[26px] font-semibold font-figtree mb-2">⭐️ Featured IP Creators</div>
                <div className="text-slate-400 tex-xs sm:text-base font-semibold font-figtree leading-snug tracking-tight mb-9">Choose a creator as your AI agent knowledge base</div>
                <ImageCarousel creators={creators} />
            </div>

            <div className="list-filter relative mt-[20px] mb-[30px]">
                <CoinList />
                {/* <TokenFilterButtonGroup selectedButton={selectedButton} setSelectedButton={setSelectedButton} /> */}
                {/* <CoinList selectedButton={selectedButton} fullScreen={true} /> */}
            </div>
        </div>

        // <ToggleSwitch />
    );
};

export default HomePageContainer;
