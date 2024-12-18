import React from 'react';

type FilterButtonProps = {
    text: string;
    isSelected: boolean;
    onClick: () => void;
};

const FilterButton = ({ text, isSelected, onClick }: FilterButtonProps) => {
    return (
        <div
            onClick={onClick}
            className={`py-3 px-6 bg-slate-400/10 hover:bg-blue-200 text-white hover:text-black rounded-full text-nowrap inline-flex items-center gap-3 active:bg-blue-200 active:text-black cursor-pointer ${
                isSelected ? 'bg-blue-200 text-black' : ''
            }`}
        >
            <div className="text-center text-xs sm:text-sm  font-semibold font-figtree md:text-base">{text}</div>
        </div>
    );
};

type TokenFilterButtonGroupProps = {
    selectedButton: string;
    setSelectedButton: (button: string) => void;
};

const TokenFilterButtonGroup = ({ selectedButton, setSelectedButton }: TokenFilterButtonGroupProps) => {
    const buttons = [{ text: '💥 New Agents' }, { text: '✅ LP Created' }, { text: '🚀 Presale Live' }];

    return (
        <div className="mb-16 flex flex-row space-x-[14px] overflow-x-auto">
            {buttons.map((button) => (
                <FilterButton key={button.text} text={button.text} isSelected={selectedButton === button.text} onClick={() => setSelectedButton(button.text)} />
            ))}
        </div>
    );
};

export default TokenFilterButtonGroup;
