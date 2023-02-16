import useSWR from 'swr';
import { API_BASE_URL, ApiPath } from '../constants';
import { IChat } from '../types/data';
import { fetcher } from '../utils/fetcher';

export default function useUserChats(userId: number) {
  const { data, isLoading, error, mutate, isValidating } = useSWR<IChat[], Error>(
    `${API_BASE_URL}${ApiPath.chats}?userId=${userId}`,
    fetcher
  );

  return {
    userChats: data,
    isLoading,
    isError: error,
    mutate,
    isValidating,
  };
}
