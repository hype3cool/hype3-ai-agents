'use client';
import React from 'react';
import Link from 'next/link';
import { iconMap, iconLabelMap } from '@/constants/constants';

type LinkButtonProps = {
    icon: keyof typeof iconMap;
    url: string;
    text?: string;
};

const LinkButton: React.FC<LinkButtonProps> = ({ icon, url, text }) => {
    return (
        <Link href={url} passHref target="_blank" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="hype3-icon-text-btn text-blue-200 h6 font-semibold  hype3-bg-emerald-to-teal">
                <span className={iconMap[icon]} /> {text ?? iconLabelMap[icon]}
            </button>
        </Link>
    );
};
export default LinkButton;
