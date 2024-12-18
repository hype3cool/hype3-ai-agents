import Link from 'next/link';
import React from 'react';

type TwitterBadgeProps = {
    username: string;
    className?: string;
    iconClassName?: string;
    labelClassName?: string;
};

const TwitterBadge = ({ username, className = 'h-[20px] px-[5px] py-[3px] rounded-[3px]', iconClassName = 'text-[8px]', labelClassName = 'text-[10px]' }: TwitterBadgeProps) => {
    return (
        <Link href={`https://x.com/${username}`} target="_blank">
            <div className={`flex flex-row items-center border-[0.5px] border-blue-200/10 bg-green-950/50 ${className}`}>
                <span className={`icon-x-twitter text-blue-200 ${iconClassName}`} />
                <div className={`text-blue-200 font-bold pl-1 ${labelClassName}`}>{username}</div>
            </div>
        </Link>
    );
};

export default TwitterBadge;
