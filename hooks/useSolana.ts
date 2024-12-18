import { useEffect, useState } from 'react';
import { HealthService } from '@/services/health.service';

const useSolana = () => {
    const [priceInUsd, setPriceInUsd] = useState<number>(0);
    const [tps, setTps] = useState<number>(0);
    
    const getSolanaMarketData = async () => {
        try {
            const response = await new HealthService().getSolanaMarketData();

            if (response.data.priceInUsd) { 
                setPriceInUsd(response.data.priceInUsd);
            }

            if (response.data.tps) {
                setTps(response.data.tps);
            }
        } catch (error) {
            // console.log(error);
        }
    };

    useEffect(() => {
        getSolanaMarketData();
    }, []);

    // every 60 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            getSolanaMarketData();
        }, 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    return {
        priceInUsd,
        tps
    };
};

export default useSolana;