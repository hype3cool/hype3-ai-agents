'use client';
import { showExplorer } from '@/utils/displayUtils';
import { showMessage } from '@/utils/toast';
import Link from 'next/link';
import React, { useState } from 'react';

type WalletAddressChipProps = {
    address: string;
    prefix: string;
};
const WalletAddressChip = ({ address, prefix }: WalletAddressChipProps) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyClick = () => {
        navigator.clipboard.writeText(address);
        setIsCopied(true);
        setTimeout(() => {
            showMessage('Copied to clipboard');
            setIsCopied(false);
        }, 100);
    };
    

    return (
        <span className="inline-flex items-center gap-x-1.5 py-1 h-5 px-2.5 rounded-full text-[#03e1ff]/80 text-[10px] font-bold uppercase leading-[10px] tracking-tight bg-[#03e1ff]/20 border border-[#03e1ff]/25 space-x-1">
            <div className="font-bold uppercase base-text">
                {prefix}
                {address.slice(0, 6)}...{address.slice(-3)}
            </div>
            <Link href={showExplorer(address)} target="_blank" className="flex items-center">
                <span className="icon-expand w-[9px] h-[9px] relative" />
            </Link>
            <button onClick={handleCopyClick}>
                <span className="icon-copy w-[9px] h-[9px] relative" />
            </button>
        </span>
    );
};

export default WalletAddressChip;
