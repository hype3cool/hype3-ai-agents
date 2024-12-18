// import { redirect } from 'next/navigation';

// import UserProfileContent from '@/components/user/UserProfileContent';

// export default function UserProfilePage({ params }: { params: { username: string } }) {
//     const username = params.username;

//     if (!username) {
//         redirect('/');
//     }

//     return (
//         <div className="px-4 my-32">
//             <div className="container mx-auto !max-w-[800px]">
//                 <UserProfileContent username={username} />
//             </div>
//         </div>
//     );
// }

// react & next
import React, { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';

// ui
import ChatClientProvider from '@/components/chat/ChatClientProvider';
import { ChatRoomProvider } from '@/components/chat/ChatRoomProvider';
import CoinContentPage from '@/components/coin/layouts/CoinContentPage';
// import PageViewTracker from '@/components/coin/elements/pageview-tracker';

import { CoinService } from '@/services/coin.service';
import { Coin } from '@/types/types';
import { CoinDataProvider } from '@/components/coin/CoinDataProvider';
import axios from 'axios';
import TokenWideCard from '@/components/token/TokenWideCard';
import TokenProfileCard from '@/components/token/TokenProfileCard';

type Props = {
    params: { mint: string };
    // searchParams: { [key: string]: string | string[] | undefined };
};

async function getData(mint: string): Promise<any> {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/coin?mint=${mint}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching coin data:', error);
        throw error;
    }
}

// Fetch the coin data and generate metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const coin: Coin = await getData(params.mint);

    if (!coin) {
        // Redirect if coin is not found
        redirect('/');
    }

    return {
        title: `${coin.name} - HYPE3`,
        description: coin.description || '',
        openGraph: {
            title: `{coin.name} - HYPE3`,
            description: coin.description || '',
            url: 'https://hype3.cool',
            images: [
                {
                    url: coin.imageUri || '',
                    width: 256,
                    height: 256,
                    alt: `{coin.name} - HYPE3`,
                },
            ],
            siteName: 'Hype3.Cool',
        },
        // twitter: {
        //     card: 'summary_large_image',
        //     title: coin.name || 'Token',
        //     description: coin.description || '',
        //     images: [coin.imageUri || '/default-image.jpg'],
        // },
    };
}

export default async function Page({ params }: Props) {
    let coin: Coin | null = null;
    try {
        coin = await getData(params.mint);

        if (!coin) {
            return redirect('/');
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        // Redirect to home or show an error page
        redirect('/');
    }

    return (
        <div className="px-4 my-32">
            <div className="container mx-auto !max-w-[800px]">
                <TokenProfileCard coin={coin} />
                {/* <pre className="text-white">{JSON.stringify(coin, null, 4)}</pre> */}
            </div>
        </div>

        // <Suspense fallback={<div>Loading...</div>}>
        //     <CoinDataProvider mint={coin?.mint} solCollectionWallet={coin?.solCollectionWallet}>
        //         <ChatClientProvider>
        //             <ChatRoomProvider roomId={coin?.mint} amountToChat={0}>
        //                 <CoinContentPage coin={coin} />
        //                 {/* <PageViewTracker coin={coin} /> */}
        //             </ChatRoomProvider>
        //         </ChatClientProvider>
        //     </CoinDataProvider>
        // </Suspense>
    );
}
