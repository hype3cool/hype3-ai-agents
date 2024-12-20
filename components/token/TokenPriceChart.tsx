'use client';
import React from 'react';

type TokenPriceChartProps = {
    mint: string;
};

const TokenPriceChart = ({ mint }: TokenPriceChartProps) => {
    return (
        <iframe
        // className={isSidePanelOpen ? 'iframe-disabled': ''}
        className='iframe-disabled w-full !h-[450px]'
            src={`https://dexscreener.com/solana/${mint}?embed=1&theme=dark&trades=0&info=0&chart=1`}
            style={{ width: '100%', height: '100%', border: 'none' }}
            // title={`${data.name} Chart`}
        />
    );
};

export default TokenPriceChart;
