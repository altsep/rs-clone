import useSWR from 'swr';
import { API_BASE_URL, ApiPath } from '../constants';
import { IUser } from '../types/data';
import { fetcher } from '../utils/fetcher';

export default function useUser(id: number) {
  const { data, error, isLoading, mutate } = useSWR<IUser, Error>(`${API_BASE_URL}${ApiPath.users}/${id}`, fetcher);

  return {
    user: data,
    isLoading,
    isError: error,
    mutate,
  };
}
