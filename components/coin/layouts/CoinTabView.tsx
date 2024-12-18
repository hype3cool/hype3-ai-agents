'use client';

import React, { useState } from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';


// ui
import MainTabList, { TabItemProps } from '@/components/layouts/tab/MainTabList';
import SwapJupiterButton from '@/components/elements/buttons/SwapJupiterButton';


import SwapTabPanel from '@/components/coin/layouts/SwapTabPanel';
import TransactionTabPanel from '@/components/coin/layouts/TransactionTabPanel';



import { IRootState, useSelector } from '@/store';
import { Coin } from '@/types/types';
import TwitterTimeline from '../elements/TwitterTimeline';

const categories: TabItemProps[] = [
    {
        name: 'Swap',
    },
    {
        name: 'Transactions',
    },
    {
        name: 'X Feed',
    },
];

type CoinTabViewProps = {
    data: Coin;
};

const CoinTabView = ({ data }: CoinTabViewProps) => {
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const twitterUrl = data?.socials?.twitter?.url || '';

    return (
        <div className="relative">
            <TabGroup
                selectedIndex={selectedIndex}
                onChange={setSelectedIndex}
                className={`flex flex-col justify-between ${themeConfig.topAlertBar ? 'h-[calc(100dvh-6.125rem-40px)]' : 'h-[calc(100dvh-4.25rem-40px)]'} overflow-hidden w-full`}
            >
                <div className="sticky top-0 z-30 border-b border-white/10">
                    <MainTabList categories={categories} />
                </div>

                <TabPanels className="w-full h-full overflow-y-auto flex-grow">
                    <TabPanel className="tab-panel-1 p-4">
                        <SwapTabPanel data={data} />
                    </TabPanel>
                    <TabPanel className="tab-panel-2">
                        <TransactionTabPanel data={data} />
                    </TabPanel>
                    <TabPanel className="tab-panel-3 p-4">
                        <TwitterTimeline username={twitterUrl.split('/')[3]} />
                    </TabPanel>
                </TabPanels>

                <div className="p-4 flex-1">
                    <SwapJupiterButton mint={data?.mint} />
                </div>
            </TabGroup>
        </div>
    );
};

export default CoinTabView;
