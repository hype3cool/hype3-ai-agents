'use client';
import React, { Fragment, useEffect, useRef, useState } from 'react';

// hooks
import { useChatRoom } from '@/hooks/useChatRoom';

// ui
import { Field, Label, Radio, RadioGroup } from '@headlessui/react';
import CoinCard from '@/components/coin/elements/CoinCard';
import SoldCoinCard from '@/components/coin/elements/SoldCoinCard';
import styled from 'styled-components';

// redux
import { dispatch, useSelector } from '@/store';
import { getAllCoins, getAllCoinsReset } from '@/store/slices/coin';

// types
import { Coin } from 'types/types';
import Link from 'next/link';
import { CoinDataProvider } from '../CoinDataProvider';
import { useRouter, useSearchParams } from 'next/navigation';
// import { useGetCoins } from '@/hooks/useGetCoins';
import TokenFilterButtonGroup from '@/components/layouts/home/TokenFilterButtonGroup';
import { FilterButton } from '@/components/layouts/home/FilterButton';

const CardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;

    /* Center on smaller screens */
    @media (max-width: 1331px) {
        /* 2 columns - 691, 3 columns - 1031 */
        justify-content: center;
    }
`;

const typeOptions = [
    { name: '💥 New Agents', value: 'all' },
    { name: '✅ LP Created', value: 'created' },
    { name: '🚀 Presale Live', value: 'presale' },
];

type CoinListProps = {
    // fullScreen?: boolean;
    // selectedButton: string;
};

const COINS_PER_PAGE = 12;

const CoinList = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // const [type, setType] = useState(searchParams.get('type') || 'all');
    const [type, setType] = useState('all');
    // const [sortBy, setSortBy] = useState('createdAt');
    // const [sortDirection, setSortDirection] = useState('asc');

    // const { data: coins, error, isLoading, refetch } = useGetCoins(type, sortBy, sortDirection);

    // // useEffect(() => {
    // //     const params = new URLSearchParams();
    // //     params.set('type', type);
    // //     params.set('sortBy', sortBy);
    // //     params.set('sortDirection', sortDirection);
    // //     router.push(`?${params.toString()}`);
    // // }, [type, sortBy, sortDirection, router]);
    const { coins, getAllCoinsStatus } = useSelector((state: any) => state.coin);

    const handleCardClick = (mint: string) => {
        router.push(`/token/${mint}`);
    };

    useEffect(() => {
        if (type) dispatch(getAllCoins({ type }));
    }, [type]);

    // Reset loading state and scroll to load more
    useEffect(() => {
        if (getAllCoinsStatus === 'success') {
            // setIsLoading(false);
            // if (page > 1 && loadMoreRef.current) {
            //     loadMoreRef.current.scrollIntoView({ behavior: 'smooth' });
            // }
            dispatch(getAllCoinsReset());
        }
    }, [getAllCoinsStatus]);

    return (
        <Fragment>
            <div className="mb-16 flex flex-row space-x-[14px] overflow-x-auto">
                <RadioGroup value={type} onChange={setType} aria-label="Server size" className="mb-16 flex flex-row space-x-[14px] overflow-x-auto">
                    {typeOptions.map((typeOption) => (
                        <Radio key={typeOption.name} value={typeOption.value} className="group relative flex flex-row cursor-pointer ">
                            <div
                                className={`py-3 px-6 bg-slate-400/10 hover:bg-blue-200 text-white hover:text-black rounded-full text-nowrap inline-flex items-center gap-3 active:bg-blue-200 active:text-black cursor-pointer
                                     group-data-[checked]:bg-blue-200 group-data-[checked]:text-black`}
                            >
                                <div className="text-center text-xs sm:text-sm  font-semibold font-figtree md:text-base">{typeOption.name}</div>
                            </div>
                        </Radio>
                    ))}
                </RadioGroup>
            </div>
            <CardContainer>
              

                {coins &&
                    coins.map((coin: Coin, index: number) => (
                        <div className="flex-shrink-0 w-[420px] mb-4" key={coin.mint}>
                            <div key={coin.mint} className="coin-item cursor-pointer" onClick={() => handleCardClick(coin.mint)}>
                                {coin?.isCreated ? <SoldCoinCard coin={coin} /> : <CoinCard coin={coin} />}
                            </div>
                        </div>
                    ))}
            </CardContainer>
            {/* {page < Math.ceil(coins.length / COINS_PER_PAGE) && (
                <div ref={loadMoreRef} className="mt-16 h-[100px] flex items-center justify-center">
                    <button
                        type="button"
                        className="hype3-icon-text-btn text-sm text-blue-400 font-semibold bg-blue-400/10 h-button h-button-border"
                        onClick={handleLoadMore}
                        disabled={isLoading && getAllCoinsStatus === 'loading'}
                    >
                        {isLoading ? 'Loading...' : 'Load More'}
                    </button>
                </div>
            )} */}
        </Fragment>
    );
};

export default CoinList;
