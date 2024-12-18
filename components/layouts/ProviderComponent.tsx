'use client';

import App from '@/App';
import { store } from '@/store';
import { Provider } from 'react-redux';
import React, { ReactNode } from 'react';

import { AuthProvider } from '../auth/AuthProvider';
import PrivyProviderWrapper from '../providers/PrivyProviderWrapper';


import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface IProps {
    children?: ReactNode;
}

const SOLANA_CONNECTION_ENDPOINT = process.env.NEXT_PUBLIC_SOLANA_RPC_HOST;

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            notifyOnChangeProps: 'all',
            // notifyOnChangeProps: 'tracked',
        },
    },
});

const ProviderComponent = ({ children }: IProps) => {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <PrivyProviderWrapper>
                    <AuthProvider>
                        <App>{children}</App>
                    </AuthProvider>
                </PrivyProviderWrapper>
            </QueryClientProvider>
        </Provider>
    );
};

export default ProviderComponent;
