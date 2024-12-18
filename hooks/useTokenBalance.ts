'use client';

import { useEffect, useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'; // TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA

const TOKEN_2022_PROGRAM_ID = new PublicKey('TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb');

export function useTokenBalance(mintAddress: string) {
    const [balance, setBalance] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);
    // const { connection } = useConnection();
    // const wallet = useWallet();

    // useEffect(() => {
    //     const getBalance = async () => {
    //         if (wallet?.publicKey) {
    //             setIsLoading(true);

    //             try {
    //                 // Fetch token accounts for both token programs
    //                 const tokenAccountResults = await connection.getParsedTokenAccountsByOwner(wallet.publicKey, { programId: TOKEN_PROGRAM_ID });

    //                 const tokenAccountResults2022 = await connection.getParsedTokenAccountsByOwner(wallet.publicKey, { programId: TOKEN_2022_PROGRAM_ID });

    //                 // Combine results from both token programs
    //                 const allTokenAccounts = [...tokenAccountResults.value, ...tokenAccountResults2022.value];

    //                 // Find the token account for the specified mint address
    //                 const tokenAccount = allTokenAccounts.find(({ account }) => account.data.parsed.info.mint === mintAddress);

    //                 // // Find the token account for the specified mint address
    //                 // const tokenAccount = tokenAccountResults.value.find(({ account }) => account.data.parsed.info.mint === mintAddress);

    //                 // Set the balance if the token account is found
    //                 if (tokenAccount) {
    //                     const tokenAmount = tokenAccount.account.data.parsed.info.tokenAmount.uiAmount;
    //                     setBalance(tokenAmount);
    //                 } else {
    //                     setBalance(0); // No tokens found
    //                 } 
    //             } catch (error) {
    //                 console.error('Error fetching balance:', error);
    //                 setBalance(null); // Reset balance on error
    //             } finally {
    //                 setIsLoading(false);
    //             }
    //         } else {
    //             setBalance(null); // Reset balance if wallet is not connected
    //         }
    //     };

    //     getBalance();
    // }, [connection, wallet?.publicKey, mintAddress]);

    return {
        balance,
        isLoading,
    };
}
