import React, { Suspense } from 'react';
import { Metadata } from 'next';

import ChatClientProvider from '@/components/chat/ChatClientProvider';
import { ChatRoomProvider } from '@/components/chat/ChatRoomProvider';
import HomePageContainer from '@/components/layouts/home/HomePageContainer';

export const metadata: Metadata = {
    title: 'Hype3',
};

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ChatClientProvider>
                <ChatRoomProvider roomId="hype3">
                    <div className="px-4 mt-16 mb-32">
                        <div className="container mx-auto !max-w-[1440px]">
                            <HomePageContainer />
                        </div>
                    </div>
                </ChatRoomProvider>
            </ChatClientProvider>
        </Suspense>
    );
}
