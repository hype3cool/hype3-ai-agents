'use client';
import React, { Fragment, useEffect, useRef, useState } from 'react';

// hooks
import { useChatRoom } from '@/hooks/useChatRoom';

// ui
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

const CardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;

     /* Center on smaller screens */
    @media (max-width: 1331px) {     /* 2 columns - 691, 3 columns - 1031 */
        justify-content: center;
    }
`;

type CoinListProps = {
    fullScreen?: boolean;
    selectedButton: string;
};

const COINS_PER_PAGE = 12;

const CoinList = ({ fullScreen, selectedButton }: CoinListProps) => {
    const { coins, getAllCoinsStatus } = useSelector((state: any) => state.coin);
    const { allRoomsCount } = useChatRoom();

    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const loadMoreRef = useRef<HTMLDivElement>(null);

    // Fetch tokens when component mounts or when chain changes
    useEffect(() => {
        setIsLoading(true);
        dispatch(getAllCoins({}));
    }, [dispatch]);

    // Handle load more functionality
    const handleLoadMore = () => {
        if (page < Math.ceil(coins.length / Math.ceil(coins.length / COINS_PER_PAGE))) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    // Reset loading state and scroll to load more
    useEffect(() => {
        if (getAllCoinsStatus === 'success') {
            setIsLoading(false);
            if (page > 1 && loadMoreRef.current) {
                loadMoreRef.current.scrollIntoView({ behavior: 'smooth' });
            }
            dispatch(getAllCoinsReset());
        }
    }, [getAllCoinsStatus, page]);

    // Combine coins with allRoomsCount and sort them
    const combinedTokens = coins.map((coin: Coin) => ({
        ...coin,
        activeUsers: allRoomsCount[coin.mint] || 0, // Add activeUsers based on token.mint
    }));

    // Sort combined coins by activeUsers (descending)
    const sortedTokens = combinedTokens.sort((a: any, b: any) => b.activeUsers - a.activeUsers);

    // Calculate the display coins based on the current page
    const displayTokens = sortedTokens.slice(0, page * COINS_PER_PAGE);

    return (
        <Fragment>
            <CardContainer>
                {coins &&
                    displayTokens.map((coin: Coin, index: number) => (
                        <CoinDataProvider key={coin.mint} mint={coin?.mint} solCollectionWallet={coin?.solCollectionWallet}>
                            <div className="flex-shrink-0 w-[420px] mb-4">
                                <Link href={`/token/${coin.mint}`}>{coin?.isCreated ? <SoldCoinCard coin={coin} /> : <CoinCard coin={coin} />}</Link>
                            </div>

                            
                        </CoinDataProvider>
                    ))}
            </CardContainer>
            {/* <div className={`${fullScreen ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-x-4' : 'flex flex-wrap justify-center gap-10'} gap-y-24 mx-auto`}>
                {coins &&
                    displayTokens.map((coin: Coin, index: number) => (
                        <CoinDataProvider key={coin.mint} mint={coin?.mint} solCollectionWallet={coin?.solCollectionWallet}>
                            {fullScreen ? (
                                <div className="flex justify-center" key={coin.mint}>
                                    <div className="w-[320px] md:w-[380px] lg:w-[340px] xl:w-[420px] flex-shrink-0">
                                        <Link href={`/token/${coin.mint}`}>{coin?.isCreated ? <SoldCoinCard coin={coin} /> : <CoinCard coin={coin} />}</Link>
                                    </div>
                                </div>
                            ) : (
                                <div key={coin.mint} className="w-[320px] md:w-[380px] lg:w-[340px] xl:w-[420px] flex-shrink-0">
                                    <Link href={`/token/${coin.mint}`}>{coin?.isCreated ? <SoldCoinCard coin={coin} /> : <CoinCard coin={coin} />}</Link>
                                </div>
                            )}
                        </CoinDataProvider>
                    ))}
            </div> */}
            {page < Math.ceil(coins.length / COINS_PER_PAGE) && (
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
            )}
        </Fragment>
    );
};

export default CoinList;
