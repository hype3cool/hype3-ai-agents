import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth-options';
import { getServerSession } from 'next-auth/next';

export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // const { accessToken } = session.backendTokens;

    const authUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${process.env.TWITTER_CLIENT_ID!}&redirect_uri=${encodeURIComponent(
        process.env.TWITTER_CALLBACK_URL!
    )}&scope=tweet.read%20users.read&state=state&code_challenge=hype3uat&code_challenge_method=plain`;

    return NextResponse.redirect(authUrl);
}