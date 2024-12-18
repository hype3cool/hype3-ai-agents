'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

const DEXSCREEN_API = 'https://api.dexscreener.com/latest/dex/tokens';

export function useTokenDex(tokenAddress: string) {
    const [pairs, setPairs] = useState<any[]>([]);
    const [volumn, setVolumn] = useState<number>(0);
    const [marketCap, setMarketCap] = useState<number>(0);
    const [priceNative, setPriceNative] = useState<number>(0);
    const [priceUsd, setPriceUsd] = useState<number>(0);
    const [dailyChange, setDailyChange] = useState<number>(0);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const getDexPairs = async () => {
            if (!tokenAddress) {
                return;
            }

            setIsLoading(true);

            try {
                const response = await axios.get(`${DEXSCREEN_API}/${tokenAddress}`);

                if (response.data?.pairs) {
                    setPairs(response.data.pairs);
                    if (response.data.pairs.length > 0) {
                        setVolumn(response.data.pairs[0].volume.h24);
                        setMarketCap(response.data.pairs[0].fdv);
                        setPriceNative(parseFloat(response.data.pairs[0].priceNative));
                        setPriceUsd(parseFloat(response.data.pairs[0].priceUsd));
                        setDailyChange(parseFloat(response.data.pairs[0].priceChange.h24));
                    }
                }
            } catch (error) {
                console.error('Error fetching dex pairs:', error);
                setPairs([]); // Reset pairs on error
            } finally {
                setIsLoading(false);
            }
        };

        getDexPairs();
    }, [tokenAddress]);

    return { pairs, volumn, marketCap, priceNative, priceUsd, dailyChange, isLoading };
}
