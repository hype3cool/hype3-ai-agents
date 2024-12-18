import React from 'react';

import WalletAddressChip from '@/components/elements/chips/WalletAddressChip';
import CoinAvatar from './CoinAvatar';
import CoinDescription from './CoinDescription';

import { Coin } from '@/types/types';

type CoinBasicProfileProps = {
    coin: Coin;
};

const CoinBasicProfile = ({ coin }: CoinBasicProfileProps) => {
    return (
        <div className="flex flex-col">
            <div className="flex flex-row items-center justify-start gap-x-6">
                <CoinAvatar coin={coin} size="large" />
                <div className="flex flex-row items-center">
                    <h3 className="base-white font-bold text-lg lg:text-[22px] mr-1">{coin?.symbol}</h3>
                    <h4 className="base text-white/40 font-medium text-[14px] lg:text-[22px] mr-1">{coin?.name}</h4>
                </div>
            </div>

            <div className="mt-5 mb-3 flex flex-row items-center justify-start gap-2.5">
                <WalletAddressChip address={`${coin?.mint}`} prefix="CA:" />
                <WalletAddressChip address={`${coin?.solCollectionWallet}`} prefix="FUND:" />
            </div>
            <h3 className="text-lg font-normal font-figtree text-white text-left w-full">{coin?.description ? <CoinDescription description={coin?.description} /> : null}</h3>
        </div>
    );
};

export default CoinBasicProfile;
