import { COIN_FILTERS } from '@/constants/constants';
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
    setSelectedButton: (value: string) => void;
};

const TokenFilterButtonGroup = ({ selectedButton, setSelectedButton }: TokenFilterButtonGroupProps) => {
    // const buttons = [{ text: COIN_FILTERS.NEW_AGENTS }, { text: COIN_FILTERS.LP_CREATED }, { text: COIN_FILTERS.PRESALE_LIVE }];

    const options = [
        { name: '💥 New Agents', value: 'all' },
        { name: '✅ LP Created', value: 'created' },
        { name: '🚀 Presale Live', value: 'presale' },
    ];

    return (
        <div className="mb-16 flex flex-row space-x-[14px] overflow-x-auto">
            {options.map((option) => (
                <FilterButton key={option.value} text={option.name} isSelected={selectedButton === option.value} onClick={() => setSelectedButton(option.value)} />
            ))}
        </div>
    );
};

export default TokenFilterButtonGroup;
