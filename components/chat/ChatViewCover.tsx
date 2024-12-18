'use client';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import styles from './ChatViewCover.module.css';

import { useAuth } from '@/components/auth/AuthProvider';
import RoundedBuyPresaleButton from '@/components/elements/buttons/RoundedBuyPresaleButton';
import PresaleDialog from '@/components/elements/dialogs/PresaleDialog';
import OutlinedButton from '@/components/elements/buttons/OutlinedButton';
import SwapOutlinedButton from '@/components/elements/buttons/SwapOutlinedButton';

import { Coin } from '@/types/types';


type ChatViewCoverProps = {
    data: Coin;
    isMobileView?: boolean; // put in the middle
};

const ChatViewCover = ({ data, isMobileView = false }: ChatViewCoverProps) => {
    const { status } = useSession();
    const { login } = useAuth();

    const [openPresaleDialog, setOpenPresaleDialog] = useState<any>(false);

    const handlePresale = async () => {
        if (status !== 'authenticated') {
            await login();
            // showMessage('Please connect wallet', 'error');
            return;
        }

        setOpenPresaleDialog(true);
    };

    const isPresaleEnded = !!data?.presaleEndAt && new Date(data?.presaleEndAt) < new Date();

    return (
        <div className={`${styles['hero-container']} lg:h-[calc(100dvh-4.25rem-40px)] h-[calc(100dvh-4.25rem-140px)] pt-2 lg:pt-0`}>
            <div className={`content relative ${isMobileView ? 'items-start' : 'items-center'}`}>
                <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
                    <div className={`flex flex-col items-center text-center mb-12 ${isMobileView && 'my-12'}`}>
                        <div className="text-center text-blue-200 text-3xl font-semibold base-text mb-6">Unlock {data.symbol} Holder Space</div>
                        {data?.isCreated ? (
                            <>{status === 'authenticated' ? <SwapOutlinedButton symbol={data.symbol!} mint={data.mint} /> : <OutlinedButton label={`Buy ${data.symbol}`} onClick={login} />}</>
                        ) : (
                            <>{data?.solCollectionWallet && data?.presaleEndAt && <RoundedBuyPresaleButton presaleEndAt={data?.presaleEndAt} onClick={handlePresale} disabled={isPresaleEnded} />}</>
                        )}
                    </div>
                </div>
            </div>
            <PresaleDialog coin={data} open={openPresaleDialog} setOpen={setOpenPresaleDialog} />
        </div>
    );
};

export default ChatViewCover;
