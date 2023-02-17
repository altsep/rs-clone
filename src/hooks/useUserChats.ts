import useSWR from 'swr';
import { API_BASE_URL, ApiPath } from '../constants';
import { ResponseError } from '../types/common';
import { IChat } from '../types/data';
import { fetcher } from '../utils/fetcher';

export default function useUserChats(userId: number) {
  const {
    data,
    isLoading,
    error: isErrorUserChats,
    mutate,
    isValidating,
  } = useSWR<IChat[], ResponseError>(
    userId !== 0 ? `${API_BASE_URL}${ApiPath.chats}?userId=${userId}` : null,
    fetcher,
    {
      onErrorRetry: (error) => {
        // eslint-disable-next-line no-useless-return
        if (error.status === 500) return;
      },
    }
  );

  return {
    userChats: data,
    isLoading,
    isErrorUserChats,
    mutate,
    isValidating,
  };
}
