import React from 'react';

const items = [
    {
        title: 'WEEK 0',
        description: '2% fund raised will be released after > 85 SOL reached',
        isActive: true,
    },
    {
        title: 'WEEK 2',
        description: '4% fund raised + 1% of token supply will be airdropped to creator & holders at the milestone completion',
        isActive: false,
    },
    {
        title: 'WEEK 4',
        description: '4% fund raised + 1% of token supply will be airdropped to creator & holders at the milestone completion',
        isActive: false,
    },
    {
        title: 'W6-20',
        description: '1% of token supply will be airdropped to creator & holders at each milestone completion',
        isActive: false,
    },
];

const MileStoneDetails = () => {
    return (
        <div>
            {items.map((item, index) => (
                <div className="flex gap-x-3" key={index}>
                    <div
                        className={`relative last:after:hidden after:absolute after:top-[18px] after:bottom-0 after:start-1/2 after:w-px after:-translate-x-[0.5px] after:border-l-2 after:border-dashed ${item.isActive ? 'after:border-blue-200' : 'after:border-blue-200/50'}`}
                    >
                        <div className={`w-[68px] h-[18px] px-2.5 py-1 ${item.isActive ? 'bg-blue-200' : 'bg-blue-200/50'} rounded-sm flex flex-row items-center justify-center`}>
                            <div className="text-black text-xs font-extrabold font-figtree leading-tight">{item.title}</div>
                        </div>
                    </div>

                    <div className="grow pt-[1.857rem] pb-8 -ml-[1.5rem] max-w-[350px]">
                        <div className={`text-sm font-semibold ${item.isActive ? 'text-white' : 'text-white/50'}`}>{item.description}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MileStoneDetails;
