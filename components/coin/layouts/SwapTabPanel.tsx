'use client';
import { Coin } from '@/types/types';
import React from 'react';
import { useSelector } from '@/store';

import TokenProfileWithMarketInfo from '../elements/TokenProfileWithMarketInfo';
import CoinDescription from '../elements/CoinDescription';

type SwapTabPanelProps = {
    data: Coin;
};

const SwapTabPanel = ({ data }: SwapTabPanelProps) => {

    const { isSidePanelOpen } = useSelector((state: any) => state.menu);

    return (
        <div>
            <div className="hidden lg:flex items-stretch justify-start flex-row">
                <TokenProfileWithMarketInfo token={data} />
            </div>
            <div className="py-5 hidden lg:flex">{data?.description && <CoinDescription description={data.description} />}</div>

            <div className="w-full h-[450px]">
                <iframe
                    className={isSidePanelOpen ? 'iframe-disabled': ''}
                    src={`https://dexscreener.com/solana/${data.mint}?embed=1&theme=dark&trades=0&info=0&chart=1`}
                    style={{ width: '100%', height: '100%', border: 'none' }}
                    title={`${data.name} Chart`}
                />
            </div>
        </div>
    );
};

export default SwapTabPanel;
