import React from 'react';

import { Coin } from '@/types/types';
import NoMilestoneDescription from './NoMilestoneDescription';
import CoinDescription from './CoinDescription';
import IconLinkButton from '@/components/elements/buttons/IconLinkButton';
import CreationTimer from '@/components/elements/CreationTimer';

type SoldCoinCardProps = {
    coin: Coin;
};

const SoldCoinCard = ({ coin }: SoldCoinCardProps) => {
    return (
        <div className="coin-card w-full relative bg-blue-200/10 rounded-lg shadow-inner">
            <div className="bg-transparent hover:bg-gradient-to-r from-green-400 via-blue-200 to-purple-400 p-[1px] rounded-lg">
                <div className="w-full h-[335px] px-6 py-6 relative bg-black-100 rounded-lg shadow-inner flex flex-col justify-between">
                    <div className="flex flex-row space-x-5">
                        <img className="w-[100px] h-[100px] rounded-xl border-2 border-blue-200" src={coin?.imageUri || '/assets/images/token-default-avatar.jpeg'} />
                        <div className="flex flex-col justify-between">
                            <div>
                                <div className="text-white text-2xl font-medium font-figtree tracking-wide">{coin?.name}</div>
                                <div className="text-slate-400 text-sm font-semibold font-figtree tracking-tight">{coin?.symbol}</div>
                            </div>
                            <div className="items-center gap-2.5 inline-flex">
                                {coin?.socials?.twitter?.url && <IconLinkButton icon="twitter" url={coin?.socials?.twitter?.url} />}
                                {coin?.socials?.telegram?.url && <IconLinkButton icon="telegram" url={coin?.socials?.telegram?.url} />}
                                {coin?.socials?.website?.url && <IconLinkButton icon="globe" url={coin?.socials?.website?.url} />}
                                {coin?.socials?.discord?.url && <IconLinkButton icon="discord" url={coin?.socials?.discord?.url} />}
                            </div>
                        </div>
                    </div>
                    <div className="my-5">{coin?.description ? <CoinDescription description={coin?.description} /> : null}</div>

                    <div>
                        <div className=" text-blue-200 text-[10px] font-bold font-figtree uppercase leading-snug tracking-tight mb-1.5">DEV</div>
                        <div className="flex flex-row items-center gap-x-2.5">
                            <img className="w-[35px] h-[35px] rounded-full border-2 border-[#0fffa3]" src={coin?.creator?.image || '/assets/images/frog-avatar.png'} />
                            <div className=" text-blue-200 text-sm font-semibold font-figtree leading-snug">frankdegod</div>
                        </div>
                    </div>

                    <div className="flex justify-between gap-x-3.5">
                        <div className="flex justify-between flex-grow">
                            <div className="flex flex-row">
                                <div className="flex flex-col">
                                    <div className=" text-blue-200 text-[10px] font-bold font-figtree uppercase leading-snug tracking-tight">Market CAP</div>
                                    <div className="flex items-center">
                                        <div>
                                            <span className="text-white/90 text-base font-bold font-figtree leading-snug">$69.5k</span>
                                        </div>
                                        {/* <div className="pl-3.5 relative">
                                            <div className="w-[100px] h-2.5 absolute bg-slate-400/20 rounded-[30px]" />
                                            <div className="w-[23px] h-2.5 bg-gradient-to-r from-[#0fffa3] via-blue-200 to-[#ec84ff] rounded-[30px]" />
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col text-right">
                                <div className=" text-blue-200 text-[10px] font-bold uppercase font-figtree leading-snug tracking-tight">PRICE</div>
                                <div className=" text-white/90 text-base font-bold font-figtree leading-snug">$0.000051</div>
                            </div>
                        </div>
                        <div>
                            <button
                                type="button"
                                className="w-fit px-3 h-[38px] min-h-[38px] py-2 rounded-[20px] border bg-blue-200/10 text-blue-200 border-blue-200/70 hover:bg-blue-200 hover:text-black hover: disabled:cursor-not-allowed"
                                onClick={(e) => {}}
                            >
                                <div className="flex justify-center items-center py-3 space-x-2">
                                    <span className="icon-arrows text-base" />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <PresaleDialog coin={coin} open={openPresaleDialog} setOpen={setOpenPresaleDialog} /> */}
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
