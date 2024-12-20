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
import TokenPriceChart from '@/components/token/TokenPriceChart';
import TwoLine from '@/components/elements/TwoLine';
import IconLinkButton from '@/components/elements/buttons/IconLinkButton';
import { showExplorer } from '@/utils/displayUtils';
import SwapJupiterButton from '@/components/elements/buttons/SwapJupiterButton';
import TwitterTimeline from '@/components/coin/elements/TwitterTimeline';

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

                {coin?.isCreated && (
                    <div>
                        <div className="grid grid-cols-4 md:grid-cols-6 gap-4 my-8">
                            <div className="col-span-2 md:col-span-1">
                                <TwoLine title="Market CAP" value="$69.5k" />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <TwoLine title="Vol (24H)" value="$12m" />
                            </div>
                            <div className="col-span-4 md:col-span-4">
                                {coin?.mint && (
                                    <div className="flex flex-row items-center space-x-5 justify-start md:justify-end">
                                        <TwoLine title="CA" value={coin?.mint} />
                                        <IconLinkButton icon="expand" url={showExplorer(coin.mint)} />
                                    </div>
                                )}
                            </div>
                        </div>

                        <TokenPriceChart mint={coin?.mint} />

                        <div className="mt-8">
                            {/* <SwapJupiterButton mint={coin?.mint} /> */}
                            <button type="button" className="w-full h-[50px] bg-blue-200 rounded-lg">
                                Click Me
                            </button>
                        </div>
                    </div>
                )}
                {coin?.socials?.twitter?.url && (
                    <div className="mt-8">
                        <div className="w-full py-6  border-b border-slate-400/10 flex items-center justify-between">
                            <div className=" flex items-center space-x-3.5">
                                <span className="rounded-full w-3 h-3 bg-cyan-500 ripple cyan" />
                                <div className="text-white text-lg font-medium font-figtree tracking-tight">Live Sentient Tweets</div>
                            </div>

                            {coin?.socials?.twitter?.url && <IconLinkButton icon="twitter" url={coin?.socials?.twitter?.url} />}
                        </div>
                        <div className="w-full h-full overflow-y-auto flex-grow">
                            <TwitterTimeline username={coin?.socials?.twitter?.url?.split('/')[3] || ''} />
                        </div>
                    </div>
                )}
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
