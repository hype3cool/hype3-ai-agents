'use client';
// components/ToggleSwitch.tsx
// components/ToggleSwitch.tsx
// components/ToggleButtonGroup.tsx
import React, { useState } from 'react';

const ToggleSwitch2: React.FC = () => {
    const [activeButton, setActiveButton] = useState<'buying' | 'selling'>('buying');

    const handleToggle = (button: 'buying' | 'selling') => {
        setActiveButton(button);
    };

    return (
        <div className="flex items-center justify-center w-fit h-[45px] relative bg-slate-400/10 rounded-[5px] p-1">
            <button
                type="button"
                className={`px-6 py-2.5 h-[38px] text-base font-semibold font-figtree flex-nowrap transition-colors duration-300 ${activeButton === 'buying' ? 'bg-dark text-blue-200 rounded-[5px]' : 'bg-transparent text-slate-400'}`}
                onClick={() => handleToggle('buying')}
            >
                 🤖 Dev
            </button>
            <button
                type="button"
                className={`px-6 py-2.5 h-[38px] text-base font-semibold font-figtree transition-colors duration-300 ${activeButton === 'selling' ? 'bg-dark text-blue-200 rounded-[5px]' : 'bg-transparent text-slate-400'}`}
                onClick={() => handleToggle('selling')}
            >
                🎨 Creator
            </button>
        </div>
    );
};

export default ToggleSwitch2;
