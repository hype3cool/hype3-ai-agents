import React from 'react';

type SolanaCurrentPriceProps = {
    className?: string;
    price: number;
};

export const SolanaCurrentPriceBadge = ({ className, price }: SolanaCurrentPriceProps) => {
    return (
        <div className={`flex flex-row items-center gap-x-2 px-2 ${className}`}>
            <span className="icon-solana text-sm text-blue-400"></span>
            <div className="text-right text-white text-opacity-70 text-sm font-semibold font-figtree leading-snug">$ {price > 0 ? price : '--'}</div>
        </div>
    );
};
