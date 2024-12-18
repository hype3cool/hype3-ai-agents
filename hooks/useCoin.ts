// useCoin.ts
import { useEffect, useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';

import { TARGET_FUNDING_AMOUNT } from '@/constants/constants';

const useCoin = (initialAddress?: string) => {
    const [balance, setBalance] = useState<string>('0');
    const [percentage, setPercentage] = useState<number>(0);

    const getBalanceByAddress = async (address: string) => {
        try {
            const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_HOST!);
            const publicKey = new PublicKey(address);
            const balance = await connection.getBalance(publicKey);
            const solBalance = balance / 10 ** 9;
            return solBalance.toString();
        } catch (error) {
            console.error('Error fetching balance:', error instanceof Error ? error.message : error);
            return '0';
        }
    };

    useEffect(() => {
        if (!initialAddress) return;
        const fetchBalance = async () => {
            const _balance = await getBalanceByAddress(initialAddress);
            setBalance(_balance);
            setPercentage((parseFloat(_balance) / TARGET_FUNDING_AMOUNT) * 100);
        };
        fetchBalance();
    }, [initialAddress]);

    return {
        balance,
        percentage,
        getBalanceByAddress,
    };
};

export default useCoin;
