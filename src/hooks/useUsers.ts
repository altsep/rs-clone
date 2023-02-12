import useSWR from 'swr';
import { API_BASE_URL, ApiPath } from '../constants';
import { IUser } from '../types/data';
import { fetcher } from '../utils/fetcher';

export default function useUsers() {
  const { data, isLoading, error, mutate, isValidating } = useSWR<IUser[], Error>(
    `${API_BASE_URL}${ApiPath.users}`,
    fetcher
  );

  return {
    users: data,
    isLoading,
    isError: error,
    mutate,
    isValidating,
  };
}
