import React from 'react';
import { formatMarketValue } from '@/utils/displayUtils';

type TokenMarketVolumeProps = {
    marketCap: number;
    volumn: number;
    className?: string;
};

const TokenMarketVolume = ({ marketCap, volumn, className = "px-2 py-0.5" }: TokenMarketVolumeProps) => {
    return (
        <>
            <div className={`${className} rounded-[5px] flex flex-row items-center border-[0.5px] border-white/20 bg-black h-[25px]`}>
                <h6 className="text-white/70 font-semibold">Market Cap:</h6>&nbsp;
                <h6 className="text-blue-200 font-bold">{formatMarketValue(marketCap)}</h6>
            </div>

            <div className={`${className} rounded-[5px] flex flex-row items-center border-[0.5px] border-white/20 bg-black h-[25px]`}>
                <h6 className="text-white/70 font-semibold">Volume:</h6>&nbsp;
                <h6 className="text-white font-bold">{formatMarketValue(volumn)}</h6>
            </div>
        </>
    );
};

export default TokenMarketVolume;
