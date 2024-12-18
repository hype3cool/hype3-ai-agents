'use client';
import React, { use, useEffect, useState } from 'react';

import { Coin } from '@/types/types';
import Link from 'next/link';

import { formatLargeNumber, showExplorer } from '@/utils/displayUtils';
import LoadingSpinner from '@/components/elements/LoadingSpinner';
import { IRootState, useSelector, dispatch } from '@/store';
import { getPresaleList, getPresaleListReset } from '@/store/slices/coin';
import { useCoinData } from '../CoinDataProvider';
import ProgressbarWithFigure from '../elements/ProgressbarWithFigure';
import UserAvatar from '@/components/user/elements/UserAvatar';
import usePresaleUpdates from '@/hooks/usePresaleUpdates';

type PresaleHodlerTableProps = {
    data: Coin;
};

const PresaleHodlerTable = ({ data }: PresaleHodlerTableProps) => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const { presaleHolders, getPresaleListStatus } = useSelector((state: IRootState) => state.coin);
    const { fundWalletBalance, fundWalletPercentage } = useCoinData();

    return (
        <>
            {isMounted && (
                <div>
                    {getPresaleListStatus == 'loading' && <LoadingSpinner className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}

                    <div className="mx-auto max-w-screen-xl">
                        <div className="relative overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left ">
                                    <thead className="sticky top-0 text-white/40 text-sm font-semibold font-figtree leading-tight tracking-tight border-none">
                                        <tr>
                                            <th scope="col" className="px-4 py-3">
                                                Wallet
                                            </th>
                                            <th scope="col" className="px-4 py-3 text-right">
                                                Amount
                                            </th>
                                            <th scope="col" className="px-4 py-3 text-right">
                                                % of Total Fund Raised
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {presaleHolders.map((holder, index) => (
                                            <tr key={index}>
                                                <th scope="row" className="px-4 py-3 font-medium whitespace-nowrap flex flex-row items-center justify-start">
                                                    <UserAvatar user={holder} className="h-[26px] w-[26px] rounded-full object-cover" />
                                                    <Link href={showExplorer(holder?.walletAddresses[0]?.address)} target="_blank">
                                                        <h6 className="text-white/70 hover:text-blue-200 font-semibold pl-2 pr-1">{holder?.walletAddresses[0]?.address.slice(0, 6)}</h6>
                                                    </Link>
                                                </th>
                                                <td className="px-4 py-3 text-right">
                                                    <h6 className="text-white/70 font-semibold ">{formatLargeNumber(holder?.totalAmount)} SOL</h6>
                                                </td>
                                                <td className="px-4 py-3 text-right">
                                                    <>
                                                        {holder?.totalAmount && (
                                                            <div className="flex flex-row items-center justify-end space-x-2.5">
                                                                <ProgressbarWithFigure
                                                                    percentage={parseFloat(fundWalletBalance) > 0 ? (holder?.totalAmount / parseFloat(fundWalletBalance)) * 100 : 0}
                                                                />
                                                            </div>
                                                        )}
                                                    </>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PresaleHodlerTable;
