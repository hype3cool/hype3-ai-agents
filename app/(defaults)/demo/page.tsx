import CreateNewAgent from '@/components/agent/CreateNewAgent';
import ProgressbarWithFigure from '@/components/coin/elements/ProgressbarWithFigure';


import ToggleSwitch2 from '@/components/elements/switches/ToggleSwitch2';
import AuthUserProfileCardWithBg from '@/components/profile/AuthUserProfileCardWithBg';
import ProfileCard from '@/components/profile/ProfileCard';
import ProfileTable from '@/components/profile/ProfileTable';
import TokenWideCard from '@/components/token/TokenWideCard';
import Link from 'next/link';
import React from 'react';

const DemoPage = () => {
    return (
        <div className="px-4 my-32">
            <div className="container mx-auto !max-w-[800px]">
                {/* <ProfileCard />
                <div className="mt-10">
                    <ToggleSwitch2 />
                </div>
                <div className="mt-10">
                    <div className="flex justify-between mb-[43px]">
                        <ToggleSwitch2 />
                    </div>
                </div>
                <div className="mt-10">
                    <div className="flex justify-between mb-[43px]">
                        <ToggleSwitch2 />
                    </div>
                </div>
                <div className="mt-10">
s                <ProgressbarWithFigure percentage={45} />
                </div> */}
            </div>
        </div>
    );
};

export default DemoPage;
