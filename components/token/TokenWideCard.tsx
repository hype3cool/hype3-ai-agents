import React from 'react';
import IconLinkButton from '../elements/buttons/IconLinkButton';

const TokenWideCard = () => {
    return (
        <div className="relative bg-slate-400/5 rounded-lg shadow-inner border border-slate-400/20">
            <div className="flex flex-col px-[28px] py-[30px] space-y-5">
                <div className="flex flex-item space-x-[30px]">
                    {/* border-2 border-[#03e1ff] */}
                    <img className="w-[180px] h-[180px] rounded-xl shadow border-2 border-blue-200" src="/assets/images/sqaure-avatar.png" />
                    <div>
                        <div className="text-white text-2xl font-medium font-figtree tracking-wide mb-1">DeGods Agent</div>
                        <div className="text-slate-400 text-sm font-semibold font-figtree tracking-tight">$DEGOD</div>
                        <div className=" text-white/70 text-sm font-medium font-figtree leading-tight my-3">
                            Describe what the token does here. Describe what the token does here. Describe what the token does here. Describe what the token does here. Describe what the token does
                            here. Describe what the token does here. Describe what the token ds...
                        </div>

                        <div className="icon-groups items-center gap-2.5 inline-flex">
                            <IconLinkButton icon="twitter" url={'#'} />
                            <IconLinkButton icon="telegram" url={'#'} />
                            <IconLinkButton icon="discord" url={'#'} />
                            <IconLinkButton icon="globe" url={'#'} />

                            {/* {coin?.socials?.twitter?.url && <IconLinkButton icon="twitter" url={coin?.socials?.twitter?.url} />}
                                {coin?.socials?.telegram?.url && <IconLinkButton icon="telegram" url={coin?.socials?.telegram?.url} />}
                                {coin?.socials?.website?.url && <IconLinkButton icon="globe" url={coin?.socials?.website?.url} />}
                                {coin?.socials?.discord?.url && <IconLinkButton icon="discord" url={coin?.socials?.discord?.url} />} */}
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

            {/* <div className="w-[799px] h-[300px] left-0 top-0 absolute rounded-lg border border-[#92f7cb]/5" />
            
            <div className="left-[239px] top-[30.41px] absolute text-white text-2xl font-medium font-figtree tracking-wide">DeGods Agent</div>
            <div className="w-[59px] h-[17.26px] left-[239px] top-[63.94px] absolute text-slate-400 text-sm font-semibold font-figtree tracking-tight">$DEGOD</div>
            <div className="w-[530px] h-[66px] left-[239px] top-[97px] absolute text-white/70 text-sm font-medium font-figtree leading-tight">
                Describe what the token does here. Describe what the token does here. Describe what the token does here. Describe what the token does here. Describe what the token does here. Describe
                what the token does here. Describe what the token ds...
            </div>
            <div className="w-60 left-[239px] top-[175px] absolute justify-center items-center gap-2.5 inline-flex">
                <div className="w-10 h-[35px] relative">
                    <div className="w-10 h-[35px] left-0 top-0 absolute bg-slate-400/10 rounded-[18px]" />
                    <div className="w-3.5 h-3.5 left-[13px] top-[11px] absolute" />
                </div>
                <div className="w-10 h-[35px] relative">
                    <div className="w-10 h-[35px] left-0 top-0 absolute bg-slate-400/10 rounded-[18px]" />
                </div>
                <div className="w-10 h-[35px] relative">
                    <div className="w-10 h-[35px] left-0 top-0 absolute bg-slate-400/10 rounded-[18px]" />
                </div>
                <div className="w-10 h-[35px] relative">
                    <div className="w-10 h-[35px] left-0 top-0 absolute bg-slate-400/10 rounded-[18px]" />
                    <div className="w-[15px] h-[15px] left-[13px] top-[10px] absolute"></div>
                </div>
                <div className="w-10 h-[35px] relative">
                    <div className="w-10 h-[35px] left-0 top-0 absolute bg-slate-400/10 rounded-[18px]" />
                    <div className="w-[13px] h-[13px] left-[13px] top-[11px] absolute"></div>
                </div>
            </div>
            <div className="w-[65px] h-[41.62px] left-[28px] top-[230px] absolute">
                <div className="w-[65px] h-[22.33px] left-0 top-0 absolute text-[#03e1ff] text-[10px] font-bold font-figtree uppercase leading-snug tracking-tight">Market CAP</div>
                <div className="w-[50px] h-[22.33px] left-0 top-[19.29px] absolute text-white text-base font-bold font-figtree leading-snug">$69.5k</div>
            </div>
            <div className="w-[135px] h-[41.29px] left-[634px] top-[230.12px] absolute">
                <div className="left-[52px] top-0 absolute text-right text-[#03e1ff] text-[10px] font-bold font-figtree uppercase leading-snug tracking-tight">PRICE</div>
                <div className="left-0 top-[19.29px] absolute text-right text-white text-base font-bold font-figtree leading-snug">$0.000051</div>
                <div className="w-10 h-[38px] left-[95px] top-[2.88px] absolute">
                    <div className="w-10 h-[38px] left-0 top-0 absolute bg-[#03e1ff]/10 rounded-[20px] border border-[#03e1ff]/70" />
                    <div className="w-6 h-6 left-[8px] top-[7px] absolute" />
                </div>
            </div> */}
        </div>
    );
};

export default TokenWideCard;
