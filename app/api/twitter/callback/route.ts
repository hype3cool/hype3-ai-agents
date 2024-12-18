import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth-options';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';

import axios from 'axios';

export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // get the code which return from the twitter callback
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
        // Handle error case (e.g., user denied access)
        // return NextResponse.json({ error }, { status: 400 });
        console.error('Error from Twitter callback:', error);
        redirect('/');
        
    }
    
    if (!code) {
        return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const tokenResponse = await axios.post(
        'https://api.twitter.com/2/oauth2/token',
        new URLSearchParams({
            code,
            grant_type: 'authorization_code',
            client_id: process.env.TWITTER_CLIENT_ID!,
            redirect_uri: process.env.TWITTER_CALLBACK_URL!,
            // code_verifier: 'challenge', // Should match the code_challenge from the auth request
            code_verifier: 'hype3uat', // Should match the code_challenge from the auth request
        }),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${Buffer.from(`${process.env.TWITTER_CLIENT_ID!}:${process.env.TWITTER_CLIENT_SECRET!}`).toString('base64')}`,
            },
        }
    );

    // get the access token from the response of twitter oauth
    const { access_token } = tokenResponse.data;
    const profileResponse = await axios.get('https://api.twitter.com/2/users/me?user.fields=affiliation,connection_status,created_at,description,entities,id,location,most_recent_tweet_id,name,pinned_tweet_id,profile_banner_url,profile_image_url,protected,public_metrics,receives_your_dm,subscription_type,url,username,verified,verified_followers_count,verified_type,withheld', {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });

    // console.log({twitter: profileResponse.data.data})


    // write the profile data from the response of twitter oauth profile to the database
    const { id, name, username, profile_image_url, description, profile_banner_url } = profileResponse.data.data;
    const updateTwitterProfileRes = await axios.post(
        process.env.NEXT_PUBLIC_API_HOST! + `/user/${session?.user?.id}/updateTwitterProfile`,
        {
            id,
            name,
            username,
            image: profile_image_url,
            description,
            banner: profile_banner_url,
        },
        { headers: { Authorization: `Bearer ${session?.backendTokens?.accessToken}` } }
    );

    if (updateTwitterProfileRes.data.status === 'success') {
        redirect('/user/' + session?.user?.username);
    } else {
        // 404
        console.error('Failed to update Twitter profile');
        return NextResponse.redirect('/404');
    }
}