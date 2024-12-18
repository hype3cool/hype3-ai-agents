import { getAccessToken } from '@privy-io/react-auth';
import axios, { AxiosInstance } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { getSession, signIn } from 'next-auth/react';
import qs from 'qs';

const host = process.env.NEXT_PUBLIC_API_HOST!;

const axiosInstance: AxiosInstance = axios.create({
    baseURL: host,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add an interceptor to set the Authorization header with the token on each request
axiosInstance.interceptors.request.use(
    async (config) => {
        const session = await getSession()

        // check expiry
        if (session && session?.backendTokens?.accessToken) {
            const decoded = jwtDecode(session.backendTokens.accessToken);
            const expiry = decoded.exp;
            const currentTime = Date.now() / 1000;
            
            if (expiry && expiry < currentTime) {
                // refresh token
                console.log('Token expired');
                const access_token = await getAccessToken();
                await signIn('privy', {
                    token: access_token,
                });

                config.headers.Authorization = `Bearer ${access_token}`;
            } else {
                console.log('Token not expired');
                
                config.headers.Authorization = `Bearer ${session.backendTokens.accessToken}`;
            }
        }

        return config;
    },
    // (error) => Promise.reject(error),
    (error) => {
        console.log("kasdjfkjdsafj;alsj;flsjf;lkjsa;lfkjd")
        console.error('Request interceptor error:', error.message);
        return Promise.reject(error);
      }
);

export class BaseService<T> {
    protected endpoint: string;
    protected axios: AxiosInstance;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
        this.axios = axiosInstance;
    }

    async create(values: T) {
        const response = await this.axios.post(`${this.endpoint}`, values);
        return response.data;
    }

    async update(id: string, values: Partial<T>) {
        const { id: _, ...rest } = values as any;
        const response = await this.axios.put(`${this.endpoint}/${id}`, rest);
        return response.data;
    }

    async list(query?: any) {

        let queryString = ''
        if (query) {
            queryString = qs.stringify(query, { encode: true })
        }

        const response = await this.axios.get(`${this.endpoint}${queryString ? '?' + queryString : ''}`);
        return response.data;
    }

    async delete(id: string) {
        const response = await this.axios.delete(`${this.endpoint}/${id}`);
        return response.data;
    }

    async get(id: string) {
        const response = await this.axios.get(`${this.endpoint}/${id}`);
        return response.data;
    }

    // setURI(query: any): string {
    //     return qs.stringify(query, { encode: true })
    // }
}


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