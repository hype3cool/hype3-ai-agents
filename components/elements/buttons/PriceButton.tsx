import React from 'react';

type PriceButtonProps = {
    className?: string;
    label: string;
    onClick: (e: any) => void;
};

const PriceButton = ({ label, onClick, className }: PriceButtonProps) => {
    return (
        <button type="button" className={`h-6 px-2.5 py-1.5 bg-[#03e1ff]/20 rounded-[3px] justify-start items-center gap-2 inline-flex ${className}`} onClick={onClick}>
            <div className="text-white text-[10px] sm:text-xs font-bold base-text uppercase">{label}</div>
        </button>
    );
};

export default PriceButton;
