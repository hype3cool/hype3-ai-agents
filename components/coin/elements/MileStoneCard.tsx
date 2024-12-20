import React from 'react';
import styles from './MileStoneCard.module.css';
import { formatDate } from '@/utils/displayUtils';
import CircularBorder from '../elements/CircularBorder';
import { Coin, Milestone } from '@/types/types';

type MileStoneCardProps = {
    milestone: Milestone;
    coin: Coin;
};
const MileStoneCard = ({ milestone, coin }: MileStoneCardProps) => {

    const { formattedDate, formattedTime } = formatDate(coin?.presaleEndAt);

    return (
        <div className="flex flex-row flex-nowarp overflow-x-auto space-x-7 py-6">
            <div className="p-0.5 w-full max-w-[80%] min-w-[600px] rounded-[10px] flex items-center justify-center relative overflow-hidden">
                <div className={styles['animated-border-box-glow']}></div>
                <div className={styles['animated-border-box']}></div>

                <div className="w-full h-[210px] flex relative z-1100 bg-black rounded-[10px]">
                    <div className="w-1/4 h-full flex flex-col items-center gap-y-3 border-r border-white/10 border-dashed px-4 py-4.5">
                        <CircularBorder display="1/10" progress={10} strokeWidth={3} />
                        <div className="text-center text-blue-200 text-xs font-semibold font-figtree leading-none tracking-tight">Current milestone ends on</div>
                        <div className="text-center text-white text-xs font-semibold font-figtree leading-[14px] tracking-tight">
                            <p>{formattedDate}</p>
                            <p>{formattedTime}</p>
                        </div>
                    </div>
                    <div className="w-3/4 flex flex-col justify-between px-4 py-4.5">
                        <div>
                            <div className="mb-2">
                                <span className="text-blue-200 text-sm font-semibold font-figtree leading-tight pr-1">{coin?.creator?.username}</span>
                                <span className="text-white/90 text-sm font-semibold font-figtree leading-tight">{milestone.shortDescription}</span>
                            </div>
                            <div className="text-white/50 text-xs font-semibold font-figtree leading-none tracking-tight">{milestone.longDescription}</div>
                        </div>
                        <div className="space-y-3">
                            <div className="text-blue-200 text-xs font-semibold font-figtree leading-none tracking-tight">When the milestone is completed</div>

                            <div className="space-x-4">
                                <div className="h-[26px] px-2.5 py-2 bg-blue-200/20 rounded-[5px] border border-blue-200/25 justify-start items-center gap-2 inline-flex">
                                    <div className="text-blue-200/80 text-[10px] font-bold font-figtree uppercase leading-[10px] tracking-tight">0.5% / TOKEN SUPPLY to creator</div>
                                </div>

                                <div className="h-[26px] px-2.5 py-2 bg-blue-200/20 rounded-[5px] border border-blue-200/25 justify-start items-center gap-2 inline-flex">
                                    <div className="text-blue-200/80 text-[10px] font-bold font-figtree uppercase leading-[10px] tracking-tight">0.5% / TOKEN SUPPLY to HOLDERS</div>
                                </div>
                            </div>

                            <div className="text-white/50 text-[10px] font-semibold font-figtree leading-[10px] tracking-tight">Otherwise 1% of the token supply will be burnt</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MileStoneCard;
