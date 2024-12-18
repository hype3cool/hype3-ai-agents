'use client';

import React from 'react';
import Link from 'next/link';
import { iconMap } from '@/constants/constants';

type IconLinkButtonProps = {
    icon: keyof typeof iconMap;
    url: string;
};

const IconLinkButton: React.FC<IconLinkButtonProps> = ({ icon, url }) => {
    return (
        <Link href={url} passHref target="_blank" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="hype3-icon-btn hype3-bg-emerald-to-teal">
                <span className={iconMap[icon]} />
            </button>
        </Link>
    );
};
export default IconLinkButton;
