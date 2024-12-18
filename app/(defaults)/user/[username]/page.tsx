import { redirect } from 'next/navigation';

import UserProfileContent from '@/components/user/UserProfileContent';

export default function UserProfilePage({ params }: { params: { username: string } }) {
    const username = params.username;

    if (!username) {
        redirect('/');
    }

    return (
        <div className="px-4 my-32">
            <div className="container mx-auto !max-w-[800px]">
                <UserProfileContent username={username} />
            </div>
        </div>
    );
}
