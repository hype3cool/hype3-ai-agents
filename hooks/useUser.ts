import { User } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const getUser = async (username: string): Promise<User> => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/user/${username}`);
    return data.data;
};

export const useGetUser = (username: string) => {
    return useQuery({
        queryKey: ['user', username],
        queryFn: () => getUser(username),
        enabled: !!username,
    });
};