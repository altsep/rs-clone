import useSWR from 'swr';
import { BASE_URL, PATH } from '../constants';
import { IUsers } from '../types/data';
import { fetcher } from '../utils/fetcher';

export default function useUsers() {
  const { data, isLoading, error, mutate } = useSWR<IUsers, Error>(`${BASE_URL}${PATH.users}`, fetcher);

  return {
    users: data,
    isLoading,
    isError: error,
    mutate,
  };
}
