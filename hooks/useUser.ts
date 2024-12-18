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
    // return useQuery({
    //     queryKey: ['user', username],
    //     queryFn: () => getUser(username),
    //     enabled: !!username,
    // });
};

// export const useActivityDetails = (slug: string) => {
//   return useQuery({
//     queryKey: ["activity", slug],
//     queryFn: () => getActivityBySlug(slug),
//     enabled: !!slug, // Only run the query if slug is truthy
//   });
// };

// const QUERY_KEY = ['User'];

// const fetchUser = async (username: string) => {
//     const response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/user/${username}`);
//     return response.data;
// };

// type GetUserQueryParams = {
//     username: string;
// };

// const fetchUser = async (params: GetUserQueryParams): Promise<User> => {
//     // const { data } = await apiClient.get(`/users/${params.userId}`);
//     const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/user/${params.username}`);
//     return data;
// };

// export const useGetUser = (params: GetUserQueryParams) => {
//     return useQuery<User, Error>({ queryKey: QUERY_KEY, queryFn: () => fetchUser(params) });
// };

// // export const useUser = (username: string) => {
// //     return useQuery({
// //         queryKey: ['user', username],
// //         queryFn: () => fetchUser(username),
// //         enabled: !!username,
// //     });
// // };
