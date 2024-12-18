import * as React from 'react';

export interface TabSwitchProps {
    activeTab: string;
    tabs: Array<{
        id: string;
        label: string;
        icon: string;
    }>;
}

export const TabSwitch: React.FC<TabSwitchProps> = ({ activeTab, tabs }) => {
    return (
        <div className="flex gap-5 justify-between p-1 mt-10 max-w-full text-base font-semibold rounded-md bg-slate-400 bg-opacity-10 w-[220px]">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={`px-5 py-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 ${activeTab === tab.id ? 'text-cyan-400 bg-neutral-900' : 'text-slate-400'}`}
                    tabIndex={0}
                >
                    {tab.icon} {tab.label}
                </button>
            ))}
        </div>
    );
};
