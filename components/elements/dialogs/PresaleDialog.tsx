'use client';
import React, { useEffect } from 'react';

import BaseDialog from './BaseDialog';
import PresaleForm from '@/components/coin/PresaleForm';

import { Coin } from '@/types/types';
import { IRootState, useSelector } from '@/store';

type PresaleDialogProps = {
    coin: Coin;
    open: any;
    setOpen: React.Dispatch<any>;
};

const PresaleDialog = ({ coin, open, setOpen }: PresaleDialogProps) => {
    const { createPresaleTransactionStatus } = useSelector((state: IRootState) => state.coin);

    // action after success of presale transaction
    useEffect(() => {
        if (createPresaleTransactionStatus === 'success') {
            // reset(); // reset the form value after success
            setOpen(false);
        }
    }, [createPresaleTransactionStatus]);

    return (
        <BaseDialog open={open} setOpen={setOpen}>
            <PresaleForm coin={coin} />
        </BaseDialog>
    );
};

export default PresaleDialog;
