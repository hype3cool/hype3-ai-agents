'use client';
import React, { useState } from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { useSession } from 'next-auth/react';

// ui
import MainTabList, { TabItemProps } from '@/components/layouts/tab/MainTabList';
import TwitterTimeline from '../elements/TwitterTimeline';
import PresaleHodlerTable from '@/components/coin/layouts/PresaleHodlerTable';

import { IRootState, useSelector } from '@/store';
import { Coin } from '@/types/types';
import PresaleTabPanel from './PresaleTabPanel';
import BuyPresaleButton from '@/components/elements/buttons/BuyPresaleButton';
import PresaleDialog from '@/components/elements/dialogs/PresaleDialog';
// import { showMessage } from '@/utils/toast';

// hooks
import { useAuth } from '@/components/auth/AuthProvider';
import { useCoinData } from '../CoinDataProvider';
import { TARGET_FUNDING_AMOUNT } from '@/constants/constants';
import { formatLargeNumber } from '@/utils/displayUtils';


const categories: TabItemProps[] = [
    {
        name: 'Presale',
    },
    {
        name: 'Holders',
    },
    {
        name: 'X Feed',
    },
];

type PresaleTabViewProps = {
    data: Coin;
};

const PresaleTabView = ({ data }: PresaleTabViewProps) => {
    const { data: session, status } = useSession();
    const { login } = useAuth();
    const { fundWalletBalance, fundWalletPercentage } = useCoinData();

    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const twitterUrl = data?.socials?.twitter?.url || '';

    const [openPresaleDialog, setOpenPresaleDialog] = useState<any>(false);

    const handlePresale = async () => {
        if (status !== 'authenticated') {
            await login();
            // showMessage('Please connect wallet', 'error');
            return;
        }

        setOpenPresaleDialog(true);
    };

    const isPresaleEnded = !!data?.presaleEndAt && new Date(data?.presaleEndAt) < new Date();

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
                    <TabPanel className="tab-panel-1">
                        <PresaleTabPanel coin={data} />
                    </TabPanel>
                    <TabPanel className="tab-panel-2">
                        <PresaleHodlerTable data={data} />
                    </TabPanel>
                    <TabPanel className="tab-panel-3">
                        <div className="p-4">
                            <TwitterTimeline username={twitterUrl.split('/')[3]} />
                        </div>
                    </TabPanel>
                </TabPanels>

                <div className="tabview-footer p-4 border-t border-white/10">
                    <div className="flex flex-row items-center justify-between">
                        <div className="text-white/60 text-sm font-semibold base-text">Progress</div>
                        <div className="text-right">
                            <span className="text-white/90 text-base font-bold font-figtree leading-snug">{formatLargeNumber(parseFloat(fundWalletBalance))}</span>
                            <span className="text-white/40 text-base font-bold font-figtree leading-snug"> / {TARGET_FUNDING_AMOUNT} SOL</span>
                        </div>
                    </div>
                    <div
                        className="flex w-full h-2.5 my-4 bg-gray-200 rounded-[30px] overflow-hidden dark:bg-neutral-700"
                        role="progressbar"
                        aria-valuenow={fundWalletPercentage}
                        aria-valuemin={0}
                        aria-valuemax={100}
                    >
                        <div
                            className="flex flex-col justify-center rounded-[30px] overflow-hidden bg-blue-200 text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-200"
                            style={{ width: `${fundWalletPercentage}%` }}
                        ></div>
                    </div>
                    {isPresaleEnded ? (
                        <div>
                            <button type="button" className="w-full mr-6 px-3 h-[50px] min-h-[50px] py-2 rounded-[10px] bg-white/25 text-black disabled:cursor-not-allowed" onClick={() => {}}>
                                <div className="flex justify-center items-center py-3">
                                    <div className="text-center text-white/50 text-base font-bold font-figtree">Ended & Refunded</div>
                                </div>
                            </button>
                        </div>
                    ) : (
                        <div>{data?.solCollectionWallet && data?.presaleEndAt && <BuyPresaleButton presaleEndAt={data?.presaleEndAt} onClick={handlePresale} disabled={isPresaleEnded} />}</div>
                    )}
                </div>
            </TabGroup>
            <PresaleDialog coin={data} open={openPresaleDialog} setOpen={setOpenPresaleDialog} />
        </div>
    );
};

export default PresaleTabView;
