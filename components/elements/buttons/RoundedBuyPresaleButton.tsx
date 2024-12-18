import React, { useState } from 'react';
import PresaleTimer from '../PresaleTimer';

type RoundedBuyPresaleButtonProps = {
    presaleEndAt: string;
    onClick: () => void;
    disabled: boolean;
};

const RoundedBuyPresaleButton = ({ presaleEndAt, onClick, disabled }: RoundedBuyPresaleButtonProps) => {
    return (
        <button
            onClick={onClick}
            type="button"
            className="h-button h-button-border h-10 px-5 py-2.5 bg-white/10 disabled:cursor-not-allowed"
            disabled={disabled}
        >
            <div className="flex justify-center items-center py-3">
                {presaleEndAt && <PresaleTimer presaleEndAt={presaleEndAt} className="text-center base-white font-bold" wrapText={`Buy Presale (Ends in % ⏳)`} />}
            </div>
        </button>
    );
};

export default RoundedBuyPresaleButton;
