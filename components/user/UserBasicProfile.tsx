'use client';
// react & next
import React, { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';

// ui
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import BaseAvatar from './BaseAvatar';

// hooks & utils
import { getShortUsername } from '@/utils/displayUtils';
// import { useTokenBalances } from '@/hooks/useTokenBalances';

// redux
import { IRootState, useSelector } from '@/store';
import { Coin, User } from '@/types/types';
import { TabItemProps } from '../layouts/tab/MainTabList';

import WalletAddressChip from '../elements/chips/WalletAddressChip';
import SoldCoinCard from '../coin/elements/SoldCoinCard';
import CoinCard from '../coin/elements/CoinCard';
import QRCode from '../elements/solana/QRCode';
import { useSession } from 'next-auth/react';
import { useAuth } from '../auth/AuthProvider';
import { MINIMUM_WEB2_BALANCE } from '@/constants/constants';

type UserBasicProfileProps = {
    data: User;
    hasTabs?: boolean;
    isSideBar?: boolean;
};

const categories: TabItemProps[] = [
    // {
    //     name: 'Owned',
    // },
    {
        name: 'Created',
    },
    // {
    //     name: 'Favourite',
    // },
];

const UserBasicProfile = ({ data, hasTabs = false, isSideBar = false }: UserBasicProfileProps) => {
    // const { appConfig } = useSelector((state: IRootState) => state.appConfig);
    // const { balances, isLoading } = useTokenBalances(appConfig?.tokens);

    const { data: session, status } = useSession();    
    const isOwner = session?.user?.id === data?._id || false;
    const isWeb2User = data?.oauthProvider === 'google' || false;

    const [balance, setBalance] = useState(0);
    // const { getBalance } = useAuth();

    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        if (isOwner && isWeb2User) {
            // getBalance().then((res) => {
            //     setBalance(res);
            // });
        }
    }, [isOwner, isWeb2User]);

    return (
        <div className="flex flex-col items-center px-5 py-10">
            <BaseAvatar className="w-[120px] h-[120px] rounded-full border-4 border-blue-200/20" image={data?.image} />
            {data?.username && <div className="mt-[52px] text-center text-blue-200 text-4xl font-bold base-text">{getShortUsername(data?.username)}</div>}

            {data?.twitter && (
                <Link href={`https://x.com/${data?.twitter?.username}`} target="_blank">
                    <div className="mt-4.5 text-center text-blue-200 text-lg font-semibold base-text">@{data?.twitter?.username}</div>
                </Link>
            )}

            {data?.walletAddresses[0]?.address && (
                <div className="mt-5 text-center">
                    <WalletAddressChip address={data?.walletAddresses[0]?.address} prefix={''} />
                </div>
            )}

            {isOwner && isWeb2User && (
                <div className="flex flex-col items-center gap-y-4 mt-3">
                    {balance < 100 && (
                        <div
                            className="bg-rose-400/20 border border-blue-200 text-sm text-yellow-800 rounded-lg p-4 dark:bg-yellow-800/10 dark:border-yellow-900 dark:text-blue-400"
                            role="alert"
                            tabIndex={-1}
                        >
                            <div className="flex">
                                <div className="shrink-0">
                                    <svg
                                        className="shrink-0 size-4 mt-0.5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                                        <path d="M12 9v4"></path>
                                        <path d="M12 17h.01"></path>
                                    </svg>
                                </div>
                                <div className="ms-4">
                                    <h3 id="hs-with-description-label" className="text-sm font-semibold text-blue-200">
                                        Account Not Activated
                                    </h3>
                                    <div className="mt-1 text-sm text-rose-400">You must deposit at least 0.1 SOL to activate your account before you can start trading or withdrawing.</div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mt-3 p-4 bg-black borderborder-white/10 shadow-sm rounded-xl flex flex-col items-center">
                        <div className="text-white/50 text-sm font-semibold base-text mb-4">Deposit SOL into your account shown below</div>
                        <QRCode address={data?.walletAddresses[0]?.address} />
                    </div>
                </div>
            )}

            {hasTabs && (
                <div className="w-full mt-10">
                    <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex} className="flex flex-col items-center">
                        <TabList className="flex flex-row h-[30px] lg:h-[48px] border-b border-blue-200/10 w-full justify-center">
                            {categories.map(({ name }) => (
                                <Tab
                                    key={name}
                                    className="flex-grow lg:flex-grow-0 flex items-center justify-center gap-3 px-3 md:px-4 font-figtree leading-snug tracking-tight text-sm md:text-base lg:text-lg font-semibold text-white/40 hover:text-blue-200 outline-none border-none bg-transparent data-[selected]:text-blue-200 data-[selected]:font-bold lg:data-[selected]:font-semibold whitespace-nowrap"
                                >
                                    {name}
                                </Tab>
                            ))}
                        </TabList>

                        <TabPanels className="w-full overflow-y-auto flex-grow">
                            <TabPanel className="tab-panel-1">
                                <div className="relative py-[80px] flex flex-col justify-center max-w-[1200px] mx-auto">
                                    <div className={`grid grid-cols-1 ${!isSideBar && 'sm:grid-cols-2 lg:grid-cols-2'} w-full gap-x-4 gap-y-24 mx-auto`}>
                                        {data?.createdCoins &&
                                            data?.createdCoins.map((coin: Coin, index: number) => (
                                                <div className="flex justify-center" key={coin.mint}>
                                                    <div className="w-[320px] md:w-[380px] lg:w-[340px] xl:w-[420px] flex-shrink-0">
                                                        <Link href={`/token/${coin.mint}`}>{coin?.isCreated ? <SoldCoinCard coin={coin} /> : <CoinCard coin={coin} />}</Link>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </TabPanel>
                        </TabPanels>
                    </TabGroup>
                </div>
            )}
        </div>
    );
};

export default UserBasicProfile;
