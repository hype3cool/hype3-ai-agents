import { Coin } from '@/types/types';
import React from 'react';

type CoinProfileProps = {
    coin?: Coin | undefined;
    direction?: 'row' | 'column';
};

const CoinProfile = ({ coin, direction = 'column' }: CoinProfileProps) => {
    const isSolana = !coin; // If coin is undefined, treat it as Solana

    const coinIcon = isSolana ? '/assets/icons/solana.png' : coin?.imageUri;
    const coinName = isSolana ? 'Solana' : coin?.name;
    const coinSymbol = isSolana ? 'SOL' : coin?.symbol;

    if (direction === 'column') {
        return (
            <>
                {/* <img className="w-[60px] h-[60px] rounded-[5px] border-2 border-white/10" src="https://via.placeholder.com/60x60" /> */}
                {/* bg-transparent bg-gradient-to-r from-green-400 via-blue-200 to-purple-400 p-[1px] */}
                {/* <div className="rounded-[5px] border-2 border-white/10"> */}
                    <div className="relative bg-transparent rounded-lg shadow-inner">
                        <img loading="lazy" className="w-[60px] h-[60px] rounded-[5px] border-2 border-white/10" src={coinIcon} />
                    </div>
                {/* </div> */}
                <div className="my-4 text-center">
                    <h3 className="base-white font-bold text-xl">{coinSymbol}</h3>
                    <h6 className="base text-white/40 text-sm font-semibold">{coinName}</h6>
                </div>
            </>
        );
    }

    return (
        <div className="flex items-center gap-x-2">
            <img loading="lazy" className="w-[60px] h-[60px] rounded-[5px] border-2 border-white/10" src={coinIcon} />
            <div className="flex flex-row items-center justify-start gap-x-2">
                <h3 className="base text-white/90 font-bold text-lg">{coinSymbol}</h3>
                <h6 className="base text-white/40 font-medium text-[14px]">{coinName}</h6>
            </div>
        </div>
    );
};

export default CoinProfile;
