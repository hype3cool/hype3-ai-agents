'use client';
import Link from 'next/link';

import { SolanaCurrentPriceBadge, SolanaCurrentTpsBadge } from '@/components/elements/solana';
import useSolana from '@/hooks/useSolana';

const Footer = () => {

    const { priceInUsd, tps } = useSolana();

    return (
        <footer className="mx-auto w-full fixed z-50 bottom-0 border border-t border-white border-opacity-10 bg-dark hidden lg:block">
            <div className="flex flex-row items-center">
                <div className="min-w-[120px]">
                    <div className="flex items-center justify-center gap-x-10 h-10 my-auto">
                        <Link href="https://x.com/hype3trade" target="_blank" className="text-white hover:text-white">
                            <span className="icon-x-twitter text-base"></span>
                        </Link>

                        <Link href="https://t.me/HYPE3support" target="_blank" className="text-white hover:text-white">
                            <span className="icon-telegram-no-bg text-base"></span>
                        </Link>
                    </div>
                </div>
                <div className="flex-grow overflow-hidden"> 
                    &nbsp;
                </div>
                <div className="min-w-[200px]">
                    <div className="flex items-center justify-center gap-x-2">
                        <SolanaCurrentPriceBadge price={priceInUsd} />
                        <div className="border border-r border-white border-opacity-10 h-[33px] overflow-hidden"></div>
                        <SolanaCurrentTpsBadge tps={tps}  />
                    </div>
                </div>
                <div data-id={process.env.NEXT_PUBLIC_ENV} className="hidden" />
            </div>
        </footer>
    );
};

export default Footer;
