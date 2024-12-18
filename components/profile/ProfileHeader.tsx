import * as React from 'react';

export interface ProfileHeaderProps {
    logo: string;
    navItems: Array<string>;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ logo, navItems }) => {
    return (
        <div className="flex overflow-hidden flex-wrap gap-5 justify-between self-stretch px-7 py-4 w-full border-b border-white border-opacity-10 max-md:px-5 max-md:max-w-full">
            <div className="flex gap-10 my-auto whitespace-nowrap max-md:max-w-full">
                <div className="flex gap-2.5 text-xs font-bold tracking-normal text-cyan-400 uppercase">
                    <img loading="lazy" src={logo} alt="Company logo" className="object-contain shrink-0 max-w-full aspect-[4.55] w-[109px]" />
                    <div className="gap-2.5 self-stretch px-2 py-0.5 my-auto rounded-sm border border-solid bg-cyan-400 bg-opacity-10 border-cyan-400 border-opacity-10 min-h-[16px]">BETA</div>
                </div>
                <nav className="flex gap-9 self-start text-base font-semibold tracking-normal leading-none text-slate-400">
                    {navItems.map((item) => (
                        <button key={item} className="hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400" tabIndex={0}>
                            {item}
                        </button>
                    ))}
                </nav>
            </div>
            <button className="gap-2.5 self-stretch px-5 py-2.5 text-base font-semibold text-white bg-white bg-opacity-10 rounded-[100px] hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-white">
                Sign In
            </button>
        </div>
    );
};
