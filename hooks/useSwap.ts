// hooks/useBuyCoin.ts
import { useEffect, useMemo } from 'react';
import { DEFAULT_EXPLORER, FormProps } from '@/types';

import { SwapMode } from '@jup-ag/react-hook';
import { useUnifiedWalletContext, useUnifiedWallet } from '@jup-ag/wallet-adapter';

export interface IFormConfigurator {
    simulateWalletPassthrough: boolean;
    strictTokenList: boolean;
    defaultExplorer: DEFAULT_EXPLORER;
    formProps: FormProps;
    useUserSlippage: boolean;
}

const useSwap = (mint: string) => {
    const swapFormConfig: IFormConfigurator = Object.freeze({
        simulateWalletPassthrough: false,
        strictTokenList: true,
        defaultExplorer: 'Solana Explorer',
        formProps: {
            fixedInputMint: false,
            fixedOutputMint: false,
            swapMode: SwapMode.ExactIn,
            fixedAmount: false,
            initialAmount: '',
            initialInputMint: 'So11111111111111111111111111111111111111112',
            initialOutputMint: mint,
        },
        useUserSlippage: true,
    });

    const rpcUrl = useMemo(() => process.env.NEXT_PUBLIC_SOLANA_RPC_HOST!, []);

    const passthroughWalletContextState = useUnifiedWallet();
    const { setShowModal } = useUnifiedWalletContext();

    const launchTerminal = () => {
        // if (status !== 'authenticated') {
        //     showMessage('Please connect your wallet', 'error');
        //     return;
        // }

        window.Jupiter.init({
            endpoint: rpcUrl,
            formProps : swapFormConfig.formProps,
            enableWalletPassthrough: swapFormConfig.simulateWalletPassthrough,
            passthroughWalletContextState: swapFormConfig.simulateWalletPassthrough ? passthroughWalletContextState : undefined,
            onRequestConnectWallet: () => setShowModal(true),
            strictTokenList: swapFormConfig.strictTokenList,
            defaultExplorer: swapFormConfig.defaultExplorer,
            useUserSlippage: swapFormConfig.useUserSlippage,
            platformFeeAndAccounts: {
                referralAccount: process.env.NEXT_PUBLIC_REFERRAL_KEY!,
                feeBps: 50,
            },
        });
    };


    // To make sure passthrough wallet are synced
    useEffect(() => {
        if (!window?.Jupiter?.syncProps) return;
        window.Jupiter.syncProps({ passthroughWalletContextState });
    }, [passthroughWalletContextState]);    

    return {
        launchTerminal,
        // swapFormConfig,
        // rpcUrl,
    };
};

export default useSwap;
