import React from 'react';

import { Tab, TabList } from '@headlessui/react';

export interface TabItemProps {
    name: string;
}


type MainTabListProps = {
    categories: TabItemProps[];
};

const MainTabList = ({ categories }: MainTabListProps) => {
    return (
        <TabList className="flex flex-row justify-between w-full h-[30px] lg:justify-end lg:h-[48px]">
            {categories.map(({ name }) => (
                <Tab
                    key={name}
                    className="flex-grow lg:flex-grow-0 flex items-center justify-center gap-3 px-3 md:px-4 font-figtree leading-snug tracking-tight text-sm md:text-base lg:text-lg font-semibold text-white/40 hover:text-blue-200 outline-none border-none bg-transparent data-[selected]:text-blue-200 data-[selected]:font-bold lg:data-[selected]:font-semibold"
                >
                    {name == 'Live' && <span className="rounded-full w-3 h-3 bg-cyan-500 ripple cyan" />}
                    {name}
                </Tab>
            ))}
        </TabList>
    );
};

export default MainTabList;