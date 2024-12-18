import React from 'react';
import { Coin } from '@/types/types';
import { useTokenDex } from '@/hooks/useTokenDex';
import TokenMarketVolume from './TokenMarketVolume';
import Loading from '@/app/loading';

type TokenProfileProps = {
    token: Coin;
};

const TokenProfileWithMarketInfo = ({ token }: TokenProfileProps) => {
    const { volumn, marketCap, isLoading } = useTokenDex(token.mint);

    return (
        <div className="flex items-start">
            <img className="w-[60px] h-[60px] rounded-[5px]" loading="lazy" src={token?.imageUri || '/assets/images/token-default-avatar.jpeg'} alt={token?.name} />
            <div className="ml-5 flex flex-col justify-between">
                <div className="flex flex-row items-center">
                    <h3 className="base-white font-bold text-lg lg:text-[22px] mr-1">{token?.symbol}</h3>
                    <h4 className="base text-white/40 font-medium text-[14px] lg:text-[22px] mr-1">{token?.name}</h4>
                </div>
                <div className="flex items-center gap-3.5 mt-2">{isLoading ? <Loading /> : <TokenMarketVolume marketCap={marketCap} volumn={volumn} className="px-1 lg:px-2 py-0.5" />}</div>
            </div>
        </div>
    );
};

export default TokenProfileWithMarketInfo;
