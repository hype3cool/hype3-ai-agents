import React from 'react';

import { GetServerSideProps, Metadata } from 'next';
import CoinCreateForm from '@/components/coin/CoinCreateForm';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth-options';
import { redirect } from 'next/navigation';
import CoinCreateFormWithMilestones from '@/components/coin/CoinCreateFormWithMilestones';

export const metadata: Metadata = {
    title: 'Create Token',
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
};

export default async function Page() {
    // const session = await getServerSession(authOptions);

    // If no session, redirect to home page
    // if (!session) {
    //     redirect('/');
    // }

    return (
        <div className="my-[120px]">
            <main className="w-full p-4">
                <div className="text-center base-white text-3xl font-semibold">Create New Agent</div>

                <div className="text-center mt-6 mb-16">
                    <ul className="list-none font-semibold space-y-1 text-white">
                        <li>
                            <p>
                                1. <span className="underline">Verify</span> your personal Twitter account
                            </p>
                        </li>
                        <li>
                            <p>2. Add at least one social link</p>
                        </li>
                        {/* <li>
                            <p>3. Set one milestone together with the launch (optional)</p>
                        </li> */}
                    </ul>
                </div>
                {process.env.NEXT_PUBLIC_ENV === 'prod' ? <CoinCreateForm /> : <CoinCreateFormWithMilestones />}
            </main>
        </div>
    );
}
