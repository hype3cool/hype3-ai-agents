import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
// import { getCsrfToken } from 'next-auth/react';

import { jwtDecode, JwtPayload } from 'jwt-decode';
import { JWT } from 'next-auth/jwt';
import { PrivyClient } from '@privy-io/server-auth';

const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
const PRIVY_APP_SECRET = process.env.PRIVY_APP_SECRET;
const client = new PrivyClient(PRIVY_APP_ID!, PRIVY_APP_SECRET!);

// async function refreshToken(token: JWT): Promise<JWT> {
//     const res = await fetch(process.env.NEXT_PUBLIC_API_HOST + '/auth/refresh', {
//         method: 'POST',
//         headers: {
//             authorization: `Refresh ${token.backendTokens.refreshToken}`,
//         },
//     });

//     const response = await res.json();
//     return {
//         ...token,
//         backendTokens: response,
//     };
// }

export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            id: 'privy',
            name: 'Privy',
            credentials: {
                token: { label: 'Token', type: 'text' },
            },
            async authorize(credentials, req) {
                try {
                    const authToken = credentials?.token;
                    if (!authToken) {
                        return null;
                    }

                    const claims = await client.verifyAuthToken(authToken);
                    console.log('Claims:', claims);
                    const response = await fetch(process.env.NEXT_PUBLIC_API_HOST! + '/auth/signup/privy', {
                        method: 'POST',
                        body: JSON.stringify({}),
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${authToken}`,
                        },
                    });

                    if (response.status == 401) {
                        return null;
                    }

                    const user = await response.json();
                    user.backendTokens = {
                        accessToken: authToken,
                    }

                    return user;
                } catch (e) {
                    console.error('Error authorizing with Privy:', e);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) return { ...token, ...user };

            // const decoded: any = jwtDecode(token.backendTokens.accessToken);
            // const currentTime = Date.now() / 1000;

            // if (decoded.exp < currentTime) {
            //     console.log('Token expired, refreshing...');
            //     return await refreshToken(token);
            // }
            

            return token;

            // if (new Date().getTime() < token.backendTokens.expiresIn) return token;
            // return await refreshToken(token);
        },
        async session({ session, token }) {
            session.user = token.user;
            session.backendTokens = token.backendTokens;
            return session;
        },
    },
    pages: {
        error: '/404'
    },
    logger: {
        // error(code, metadata) {
        //     console.log(code, metadata);
        // },
    },
};
