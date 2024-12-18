'use client';

import React from 'react';
import Link from 'next/link';
import { iconMap } from '@/constants/constants';

type IconLinkButtonProps = {
    icon: keyof typeof iconMap;
    url: string;
};

const PlainIconLinkButton: React.FC<IconLinkButtonProps> = ({ icon, url }) => {
    return (
        <Link href={url} passHref target="_blank" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="px-3 py-2 h-[30px] min-h-[30px] text-white hover:text-blue-200 text-base font-bold font-figtree leading-tight tracking-tight whitespace-nowrap">
                <span className={iconMap[icon]} />
            </button>
        </Link>
    );
};
export default PlainIconLinkButton;
