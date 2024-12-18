import React from 'react';

type OutlinedButtonProps = {
    label?: string;
    onClick: () => void;
};

const OutlinedButton = ({ label = '', onClick }: OutlinedButtonProps) => {
    return (
        <button type="button" className="h-button h-button-border h-10 px-5 py-2.5 bg-white/10 disabled:cursor-not-allowed" onClick={onClick}>
            <div className="text-center base-white font-bold">{label}</div>
        </button>
    );
};

export default OutlinedButton;
