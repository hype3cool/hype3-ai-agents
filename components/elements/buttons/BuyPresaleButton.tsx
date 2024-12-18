import React, { useState } from 'react';
import PresaleTimer from '../PresaleTimer';

type BuyPresaleButtonProps = {
    presaleEndAt: string;
    onClick: () => void;
    disabled: boolean;
};

const BuyPresaleButton = ({ presaleEndAt, onClick, disabled }: BuyPresaleButtonProps) => {
    return (
        <button type="button" className="w-full mr-6 px-3 h-[50px] min-h-[50px] py-2 rounded-[10px] h-gradient text-black disabled:cursor-not-allowed" onClick={onClick} disabled={disabled}>
            <div className="flex justify-center items-center py-3">
                {presaleEndAt && <PresaleTimer presaleEndAt={presaleEndAt} className="text-center text-black text-base font-bold font-figtree" wrapText={`Buy Presale (Ends in % ⏳)`} />}
            </div>
        </button>
    );
};

export default BuyPresaleButton;
