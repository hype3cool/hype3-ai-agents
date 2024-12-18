import * as React from 'react';

export interface ProfileBannerProps {
    profileImage: string;
    bannerImage: string;
    infoIcon: string;
    infoText: string;
}

export const ProfileBanner: React.FC<ProfileBannerProps> = ({ profileImage, bannerImage, infoIcon, infoText }) => {
    return (
        <div className="flex overflow-hidden relative flex-col flex-wrap gap-5 justify-between items-start px-7 pt-40 pb-5 mt-14 w-full text-sm font-semibold tracking-wide rounded-lg min-h-[240px] text-white text-opacity-70 max-md:px-5 max-md:pt-24 max-md:mt-10 max-md:max-w-full">
            <img loading="lazy" src={bannerImage} alt="Profile banner" className="object-cover absolute inset-0 size-full" />
            <img loading="lazy" src={profileImage} alt="Profile" className="object-contain shrink-0 self-start w-16 rounded-full aspect-square" />
            <div className="flex relative gap-2 self-end mt-12 max-md:mt-10">
                <img loading="lazy" src={infoIcon} alt="" className="object-contain shrink-0 self-start w-4 aspect-square" />
                <div className="flex-auto">{infoText}</div>
            </div>
        </div>
    );
};
