'use client';
import { createContext, ReactNode, useContext, useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import { Connection, PublicKey } from '@solana/web3.js';

// redux
import { createPresaleTransactionStart, createPresaleTransactionSuccess, createPresaleTransactionFailure, createPresaleTransactionReset, getPresaleListReset, updatePresaleHolders } from '@/store/slices/coin';
import { dispatch, IRootState, useSelector } from '@/store';

// import { Coin } from '@/types/types';
import { TARGET_FUNDING_AMOUNT } from '@/constants/constants';
// import { TransactionService } from '@/services/transaction.service';
import { getPresaleList } from '@/store/slices/coin';
import { TransactionLogService } from '@/services/transactionLog.service';
import usePresaleUpdates from '@/hooks/usePresaleUpdates';

interface CoinDataProviderProps {
    children: ReactNode;
    mint: string;
    solCollectionWallet: string;
}

interface CoinDataContextValue {
    buyPresale: (coinId: string, amount: number) => Promise<void>;
    sendingSOL: boolean;
    fundWalletBalance: string;
    fundWalletPercentage: number;
    getFundWalletBalance: () => Promise<void>;
    isPresalePaid: boolean;
    checkPresalePaid: () => Promise<void>;
}

export const CoinDataContext = createContext<CoinDataContextValue>({
    buyPresale: async (coinId: string, amount: number) => {},
    sendingSOL: false,
    fundWalletBalance: '0',
    fundWalletPercentage: 0,
    getFundWalletBalance: async () => {},
    isPresalePaid: false,
    checkPresalePaid: async () => {},
});

export const CoinDataProvider = ({ children, mint, solCollectionWallet }: CoinDataProviderProps) => {
    // const { provider } = useAuth();
    const { data: session, status } = useSession();
    const { holders } = usePresaleUpdates(solCollectionWallet);

    const { user } = useSelector((state: IRootState) => state.user);
    const { authUser } = useSelector((state: IRootState) => state.auth);
    const { createPresaleTransactionStatus, presaleHolders, getPresaleListStatus } = useSelector((state: IRootState) => state.coin);

    const [sendingSOL, setSendingSOL] = useState<boolean>(false);

    // special handling for buy presale stage, check if the user has paid the solCollectionWallet
    const [isPresalePaid, setIsPresalePaid] = useState(false);

    // get the balance and percentage of the coin (solCollectionWallet)
    const [fundWalletBalance, setFundWalletBalance] = useState<string>('0');
    const [fundWalletPercentage, setFundWalletPercentage] = useState<number>(0);

    // initial
    useEffect(() => {
        getFundWalletBalance();
    }, []);

    useEffect(() => {
        if (solCollectionWallet) {
            dispatch(getPresaleList(solCollectionWallet));
        }
    }, [solCollectionWallet]);

    useEffect(() => {
        if (getPresaleListStatus === 'success') {
            dispatch(getPresaleListReset());
        }
    }, [getPresaleListStatus]);

    useEffect(() => {
        if (holders.length > 0) {
            dispatch(updatePresaleHolders(holders))
        }
    }, [holders]);

    const buyPresale = async (coinId: string, amount: number) => {
        // if (!provider) return;

        // const rpc = new RPC(provider);
        // const address = await rpc.getAccounts();

        // if (!solCollectionWallet) return;

        // dispatch(createPresaleTransactionStart());

        // try {
        //     setSendingSOL(true);

        //     // Call sendTransaction with the entered amount
        //     const signature = await rpc.sendSOL(address[0], solCollectionWallet, amount);

        //     if (signature) {
        //         dispatch(createPresaleTransactionSuccess());
        //         showMessage(`Transaction sent successfully`, 'success');
        //     }
        //     // await dispatch(
        //     //     createPresaleTransaction({
        //     //         signature: signature.toString(),
        //     //         coin: coinId,
        //     //         amount: amount,
        //     //         fromAddress: address[0],
        //     //         toAddress: solCollectionWallet,
        //     //     }),
        //     // );
        // } catch (error) {
        //     dispatch(createPresaleTransactionFailure());
        //     showMessage('Failed to send transaction', 'error');
        //     console.log('Error sending transaction:', error);
        // } finally {
        //     setSendingSOL(false);
        // }
    };

    // delay a while and then update the presale list and balance
    useEffect(() => {
        if (createPresaleTransactionStatus === 'success') {
            dispatch(getPresaleList(solCollectionWallet));
            setIsPresalePaid(true);
            dispatch(createPresaleTransactionReset());
        }
    }, [createPresaleTransactionStatus]);

    const getFundWalletBalance = async () => {
        if (!solCollectionWallet) return;
        try {
            const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_HOST!);
            const publicKey = new PublicKey(solCollectionWallet);
            const balance = await connection.getBalance(publicKey);
            const balanceInString = (balance / 10 ** 9).toString();
            setFundWalletBalance(balanceInString);
            setFundWalletPercentage((parseFloat(balanceInString) / TARGET_FUNDING_AMOUNT) * 100);
        } catch (error) {
            console.error('Error fetching balance:', error instanceof Error ? error.message : error);
        }
    };

    // every 1 minute refresh the balance
    useEffect(() => {
        const interval = setInterval(
            () => {
                getFundWalletBalance();
                getPresaleList(solCollectionWallet);
            },
            1 * 60 * 1000,
        );
        return () => clearInterval(interval);
    }, []);

    const checkPresalePaid = async () => {
        if (session?.user?.id && !isPresalePaid) {
            try {
                const res = await new TransactionLogService().checkPresalePaid(solCollectionWallet);
                if (res && res.data) {
                    setIsPresalePaid(res.data.paid);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const value: CoinDataContextValue = {
        buyPresale,
        sendingSOL,
        fundWalletBalance,
        fundWalletPercentage,
        getFundWalletBalance,
        isPresalePaid,
        checkPresalePaid,
    };

    return <CoinDataContext.Provider value={value}>{children}</CoinDataContext.Provider>;
};

export const useCoinData = () => useContext(CoinDataContext);
