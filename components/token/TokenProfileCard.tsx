'use client';
import React from 'react';
import IconLinkButton from '../elements/buttons/IconLinkButton';
import { Coin } from '@/types/types';
import CoinDescription from '../coin/elements/CoinDescription';

type TokenProfileCardProps = {
    coin: Coin;
};

const TokenProfileCard = ({ coin }: TokenProfileCardProps) => {
    return (
        <div className="relative bg-slate-400/5 rounded-lg shadow-inner border border-slate-400/20">
            <div className="flex flex-col px-[28px] py-[30px] space-y-5">
                <div className="flex flex-item space-x-[30px]">
                    <img className="w-[180px] h-[180px] rounded-xl shadow border-2 border-blue-200" src={coin?.imageUri} />
                    <div className="flex flex-col justify-between">
                        <div>
                            <div className="text-white text-2xl font-medium font-figtree tracking-wide mb-1">{coin?.name}</div>
                            <div className="text-slate-400 text-sm font-semibold font-figtree tracking-tight">{coin?.symbol}</div>
                            <div className=" text-white/70 text-sm font-medium font-figtree leading-tight my-3">{coin?.description ? <CoinDescription description={coin?.description} /> : null}</div>
                        </div>

                        <div className="icon-groups items-center gap-2.5 inline-flex">
                            {coin?.socials?.twitter?.url && <IconLinkButton icon="twitter" url={coin?.socials?.twitter?.url} />}
                            {coin?.socials?.telegram?.url && <IconLinkButton icon="telegram" url={coin?.socials?.telegram?.url} />}
                            {coin?.socials?.website?.url && <IconLinkButton icon="globe" url={coin?.socials?.website?.url} />}
                            {coin?.socials?.discord?.url && <IconLinkButton icon="discord" url={coin?.socials?.discord?.url} />}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between flex-grow">
                        <div className="flex flex-col">
                            <div className=" text-blue-200 text-[10px] font-bold uppercase font-figtree leading-snug tracking-tight">Market CAP</div>
                            <div className=" text-white text-base font-bold font-figtree leading-snug">$69.5k</div>
                        </div>
                        <div className="flex flex-row space-x-[14px]">
                            <div className="flex flex-col text-right">
                                <div className=" text-blue-200 text-[10px] font-bold uppercase font-figtree leading-snug tracking-tight">PRICE</div>
                                <div className=" text-white text-base font-bold font-figtree leading-snug">$0.000051</div>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="w-fit px-3 h-[38px] min-h-[38px] py-2 rounded-[20px] border bg-blue-200/10 text-blue-200 border-blue-200/70 hover:bg-blue-200 hover:text-black hover: disabled:cursor-not-allowed"
                                >
                                    <div className="flex justify-center items-center py-3 space-x-2">
                                        <span className="icon-arrows text-base" />
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TokenProfileCard;
