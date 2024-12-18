'use client';
import React from 'react';
import { usePathname } from 'next/navigation';

import BaseContainer from '../BaseContainer';
import SwapJupiterButton from '@/components/elements/buttons/SwapJupiterButton';
import IconLinkButton from '@/components/elements/buttons/IconLinkButton';

import { useSelector } from '@/store';
import { showExplorer } from '@/utils/displayUtils';

const MobileActionBar = () => {
    const { currentCoin } = useSelector((state: any) => state.coin);

    // only show on solana content page
    const pathname = usePathname();

    // Check if the current route matches /solana/* but not exactly /solana
    if (!pathname.startsWith('/solana/') || pathname === '/solana') {
        return null;
    }

    return (
        <div className="mx-auto w-full fixed z-50 bottom-0 border border-t border-white border-opacity-10 bg-dark lg:hidden">
            <BaseContainer>
                <div className="flex items-center justify-between py-2">
                    <SwapJupiterButton mint={currentCoin?.mint} className="h-[40px] min-h-[40px] py-1.5" />

                    {currentCoin && (
                        <div className="flex items-center gap-x-2.5">
                            {currentCoin?.socials?.twitter?.url && <IconLinkButton icon="twitter" url={currentCoin?.socials?.twitter?.url} />}
                            {currentCoin?.socials?.telegram?.url && <IconLinkButton icon="telegram" url={currentCoin?.socials?.telegram?.url} />}
                            {currentCoin?.socials?.website?.url && <IconLinkButton icon="globe" url={currentCoin?.socials?.website?.url} />}
                            {currentCoin?.mint && <IconLinkButton icon="expand" url={showExplorer(currentCoin.mint)} />}
                            {/* <IconLinkButton icon="twitter" url="https://x.com/solana" />
                            <IconLinkButton icon="telegram" url="https://t.me/solana" />
                            <IconLinkButton icon="globe" url="https://solana.com/" /> */}
                        </div>
                    )}
                </div>
            </BaseContainer>
        </div>
    );
};

export default MobileActionBar;
