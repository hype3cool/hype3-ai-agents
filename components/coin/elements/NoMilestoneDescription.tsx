import { User } from '@/types/types';
import React from 'react';

type NoMilestoneDescriptionProps = {
    creator: User;
};

const NoMilestoneDescription = ({ creator }: NoMilestoneDescriptionProps) => {
    return (
        <div>
            <div className="text-blue-200 text-[10px] font-bold uppercase base-text flex items-center">💧 FUND RAISED WILL BE ADDED TO LP</div>
            <div>
                <span className="text-blue-200 text-sm font-semibold base-text pr-1">{creator.username}</span>
                <span className="text-white/90 text-sm font-semibold base-text">
                    is a verified creator. <span className="text-blue-200 text-sm font-semibold base-text">100%</span> of fund raised will be added to the liquidity pool after presale ends.
                </span>
            </div>
        </div>
    );
};

export default NoMilestoneDescription;
