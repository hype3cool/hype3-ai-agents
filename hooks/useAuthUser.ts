import { useQuery } from '@tanstack/react-query';
import { useToken } from '@privy-io/react-auth';
import axios from 'axios';

export const useAuthUser = (isAuthenticated: boolean) => {
    const { getAccessToken } = useToken();

    return useQuery({
        queryKey: ['authUser'], // Unique key for the query
        queryFn: async () => {
            const access_token = await getAccessToken();
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/me`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access_token}`,
                },
            });

            return response.data; // Return the data to be used in your component
        },
        enabled: !!getAccessToken() && isAuthenticated, // Only run if access token is available
    });
};
