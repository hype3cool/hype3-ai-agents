'use client';
import React, { useState } from 'react';

// ui
import StartTokenButton from '@/components/elements/buttons/StartTokenButton';

import CoinList from '@/components/coin/layouts/CoinList';

import JoinAsCreatorLinkButton from '@/components/elements/buttons/JoinAsCreatorLinkButton';
import Lottie from './Lottie';
import ImageCarousel from './ImageCarousel';
import ToggleSwitch from '@/components/elements/switches/ToggleSwitch';
import HomePageCaption from './HomePageCaption';
import TokenFilterButtonGroup from './TokenFilterButtonGroup';

const dataTop = [
    '/assets/images/test-card01.png',
    '/assets/images/test-card02.png',
    '/assets/images/test-card01.png',
    '/assets/images/test-card02.png',
    '/assets/images/test-card01.png',
    '/assets/images/test-card02.png',
];

const HomePageContainer = () => {
    const [selectedButton, setSelectedButton] = useState<string>('New Agents');

    return (
        <div>
            <div className="flex flex-col items-center">
                <Lottie />
                <HomePageCaption />
                <StartTokenButton />
                <JoinAsCreatorLinkButton />
            </div>

            <div className="relative py-[80px] flex flex-col">
            <div className="text-white text-[20px] sm:text-[26px] font-semibold font-figtree mb-2">⭐️ Featured IP Creators</div>
            <div className="text-slate-400 tex-xs sm:text-base font-semibold font-figtree leading-snug tracking-tight mb-9">Choose a creator as your AI agent knowledge base</div>
                <ImageCarousel images={dataTop} />
            </div>

            <div className="list-filter relative mt-[20px] mb-[30px]">
                <TokenFilterButtonGroup selectedButton={selectedButton} setSelectedButton={setSelectedButton} />
                <CoinList selectedButton={selectedButton} fullScreen={true} />
            </div>
        </div>

        // <ToggleSwitch />
    );
};

export default HomePageContainer;
