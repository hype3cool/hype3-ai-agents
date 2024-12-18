'use client';

import React from 'react';
import { useSession } from 'next-auth/react';

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import CreateNewAgent from '../agent/CreateNewAgent';
import ProfileTable from '../profile/ProfileTable';
import TokenWideCard from '../token/TokenWideCard';
import TwitterButton from '../elements/buttons/TwitterButton';

import { IRootState, useSelector } from '@/store';

type UserProfileTabViewProps = {
    username: string;
};

const UserProfileTabView = ({ username }: UserProfileTabViewProps) => {

    const { data: session, status } = useSession();
    const { authUser, getMeStatus } = useSelector((state: IRootState) => state.auth);
    const isMyProfile = status === 'authenticated' && username === authUser?.username;

    return (
        <TabGroup defaultIndex={0}>
            <div className="flex items-center justify-between w-full h-[45px] relative">
                <TabList className="flex items-center justify-center w-fit h-[45px] relative bg-slate-400/10 rounded-[5px] p-1">
                    <Tab
                        type="button"
                        className={`px-6 py-2.5 h-[38px] text-base font-semibold font-figtree flex-nowrap transition-colors duration-300 bg-transparent text-slate-400 data-[selected]:bg-dark data-[selected]:text-blue-200 data-[selected]:rounded-[5px] data-[selected]:ring-0`}
                    >
                        🤖 Dev
                    </Tab>
                    <Tab
                        type="button"
                        className={`px-6 py-2.5 h-[38px] text-base font-semibold font-figtree flex-nowrap transition-colors duration-300 bg-transparent text-slate-400 data-[selected]:bg-dark data-[selected]:text-blue-200 data-[selected]:rounded-[5px]`}
                    >
                        🎨 Creator
                    </Tab>
                </TabList>

                {isMyProfile && <TwitterButton />}
            </div>
            <TabPanels className="mt-[43px]">
                <TabPanel>{isMyProfile ? <CreateNewAgent /> : <TokenWideCard />}</TabPanel>
                <TabPanel>
                    {isMyProfile && (
                        <div className="flex flex-row items-center justify-end gap-x-1.5 mb-[48px]">
                            <div className="flex flex-row items-center justify-end gap-x-1.5">
                                <div className="text-blue-200 text-base font-semibold font-figtree leading-snug tracking-tight">Do you want to be listed as a creator?</div>
                                <input
                                    type="checkbox"
                                    // {...register('isCreator')}
                                    className="appearance-none peer relative w-[3.25rem] h-7 p-px bg-gray-100 border border-gray-200 rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-blue-600 disabled:opacity-50 disabled:pointer-events-none checked:bg-none  checked:border-blue-200 focus:checked:border-blue-200 dark:bg-dark dark:border-neutral-700 dark:checked:bg-blue-200/5 dark:checked:border-blue-200 dark:focus:ring-offset-gray-600 before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-blue-600 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-blue-200/5 dark:checked:before:bg-blue-200"
                                />
                            </div>
                        </div>
                    )}
                    <ProfileTable />
                </TabPanel>
            </TabPanels>
        </TabGroup>
    );
};

export default UserProfileTabView;
