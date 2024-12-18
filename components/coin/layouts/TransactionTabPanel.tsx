'use client';
import React from 'react';
import { Coin } from '@/types/types';
import { useSelector } from '@/store';

type TransactionTabPanelProps = {
    data: Coin;
};

const TransactionTabPanel = ({ data }: TransactionTabPanelProps) => {
    const { isSidePanelOpen } = useSelector((state: any) => state.menu);

    return (
        <div className="h-dvh overflow-hidden">
            <iframe
                className={isSidePanelOpen ? 'iframe-disabled' : ''}
                src={`https://dexscreener.com/solana/${data.mint}?embed=1&theme=dark&trades=1&info=0&chart=0`}
                style={{ width: '100%', height: '100%', border: 'none' }}
                title={`${data.name} Chart`}
            />
        </div>
    );
};

export default TransactionTabPanel;
