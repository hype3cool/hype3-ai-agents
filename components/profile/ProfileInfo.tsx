import * as React from 'react';

export interface ProfileInfoProps {
    avatar: string;
    verifiedIcon: string;
    name: string;
    username: string;
    amount: string;
    currency: string;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({ avatar, verifiedIcon, name, username, amount, currency }) => {
    return (
        <div className="flex z-10 flex-wrap gap-10 px-7 py-5 max-w-full text-base rounded-none border border-solid border-slate-400 border-opacity-10 w-[798px] max-md:px-5">
            <div className="flex flex-1 gap-1.5 items-start font-semibold tracking-wide leading-5 text-cyan-400">
                <img loading="lazy" src={avatar} alt={`${name}'s avatar`} className="object-contain shrink-0 w-9 aspect-square" />
                <div className="self-stretch">
                    <span className="text-lg font-bold text-white">{name}</span>
                    <br />
                    <span className="text-xs text-slate-400">{username}</span>
                </div>
                <img loading="lazy" src={verifiedIcon} alt="Verified badge" className="object-contain shrink-0 w-4 aspect-square" />
            </div>
            <div className="self-start mt-5 font-bold text-right text-white">
                <span className="leading-5">{amount} </span>
                <span className="leading-5 text-slate-400">({currency})</span>
            </div>
        </div>
    );
};
