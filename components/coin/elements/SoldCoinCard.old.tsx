import React from 'react';

import { Coin } from '@/types/types';
import NoMilestoneDescription from './NoMilestoneDescription';

type SoldCoinCardProps = {
    coin: Coin;
};

const SoldCoinCard = ({ coin }: SoldCoinCardProps) => {
    return (
        <div className="coin-card w-full relative rounded-lg shadow-inner bg-blue-200/10">
            <div className="bg-transparent rounded-lg border border-[#92f7cb]/5">
                <div className="h-full w-full relative rounded-lg shadow-inner">
                    <div className="flex flex-col justify-between">
                        <div className="py-4.5 px-5 flex justify-between border-b border-dashed border-white/10">
                            <div className="flex items-start">
                                <img className="w-12 h-12 rounded-[5px]" loading="lazy" src={coin?.imageUri || '/assets/images/token-default-avatar.jpeg'} alt={coin?.name} />
                                <div className="ml-3.5 flex flex-col justify-between">
                                    <div className="base text-white/90 font-semibold text-lg lg:text-[22px] mr-1">{coin?.symbol}</div>
                                    <div className="text-white/50 text-sm font-medium">{coin?.name}</div>
                                </div>
                            </div>
                            <div className="flex">
                                <CircularBorder size={50} strokeWidth={1} />
                            </div>
                        </div>
                        <div className="flex flex-col pt-[11px]">
                            <div className="price-tag-groups flex justify-between  px-5">
                                <div className="text-left w-1/3">
                                    <div className="base text-blue-400 text-[10px] font-bold uppercase">PRICE (-14% | 24h)</div>
                                    <div>
                                        <span className="base text-white/90 text-base font-bold">$0.00005981</span>
                                        {/* <span className="base text-white/40 text-base font-bold">SOL</span> */}
                                    </div>
                                </div>

                                <div className="text-right w-1/3">
                                    <div className="base text-blue-400 text-[10px] font-bold uppercase">CREATED</div>
                                    <div className="text-white/90 text-base font-bold">1d ago</div>
                                </div>
                            </div>
                            <div className="relative flex flex-col items-center justify-center w-full h-[128px] bg-white rounded-lg shadow-none mt-4.5">
                                <div className="absolute inset-0 bg-black rounded-tl-lg rounded-tr-lg border-t border-transparent">
                                    {/* items-center justify-center */}
                                    <div className="flex flex-row h-full w-full bg-black rounded-lg p-5">
                                        <div className="relative w-9 h-9 min-w-9 rounded-full overflow-hidden border border-transparent bg-gradient-to-r from-green-400 via-blue-200 to-purple-400">
                                            <img loading="lazy" className="w-full h-full object-cover" src={'/assets/images/avatar11.png'} />
                                        </div>
                                        <div className="pl-4">{coin?.creator && <NoMilestoneDescription creator={coin?.creator} />}</div>
                                        {/* <div className="pl-4">
                                            <div className="text-blue-200 text-[10px] font-bold  uppercase base-text">🔥 SPLIT 10% AIRDROP WITH THE CREATOR</div>
                                            <div>
                                                <span className="text-blue-200 text-sm font-semibold base-text">@Frank</span>
                                                <span className="text-white/90 text-sm font-semibold base-text"> will livestream everyday for a week after the presale ends for the </span>
                                                <span className="text-blue-200 text-sm font-semibold base-text">1st milestone</span>
                                                <span className="text-white/90 text-sm font-semibold base-text">.</span>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-r from-blue-200 to-blue-400 rounded-bl-lg rounded-br-lg h-[45px] w-full">
                            <div className="flex justify-center items-center py-3">
                                <div className="text-center text-black text-base font-bold font-figtree">Join Holder Space 🚀</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SoldCoinCard;

interface CircularBorderProps {
    size?: number; // Size of the circular border in pixels
    strokeWidth?: number; // Width of the border stroke
}

const CircularBorder: React.FC<CircularBorderProps> = ({ size = 100, strokeWidth = 8 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg className="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
                <circle
                    className="text-transparent"
                    stroke="#03e1ff" // Set the stroke color to #03e1ff
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-blue-200 text-[10px] font-bold font-figree h-3">SOLD</div>
                <div className="text-blue-200 text-[10px] font-bold font-figree">OUT</div>
            </div>
        </div>
    );
};
