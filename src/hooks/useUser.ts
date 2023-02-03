import useSWR from 'swr';
import { BASE_URL, PATH } from '../constants';
import { IUser } from '../types/data';
import { fetcher } from '../utils/fetcher';

export default function useUser(id: number) {
  const { data, error, isLoading, mutate } = useSWR<IUser, Error>(`${BASE_URL}${PATH.users}/${id}`, fetcher);

  return {
    user: data,
    isLoading,
    isError: error,
    mutate
  };
}
