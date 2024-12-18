import React from 'react';

type SolanaCurrentTpsProps = {
    className?: string;
    tps: number;
};

export const SolanaCurrentTpsBadge = ({ className, tps }: SolanaCurrentTpsProps) => {
    return (
        <div className="flex flex-row items-center gap-x-2 px-2">
            <div className="text-right text-white text-opacity-70 text-sm font-semibold font-figtree leading-snug">TPS: {tps && Math.floor(tps).toLocaleString()}</div>
        </div>
    );
};