import useSWR from 'swr';
import { BASE_URL, PATH } from '../constants';
import { IUser } from '../types/data';
import { fetcher } from '../utils/fetcher';

export default function usePost(id: number) {
  const { data, error, isLoading } = useSWR<IUser, Error>(`${BASE_URL}${PATH.posts}/${id}`, fetcher);

  return {
    post: data,
    isLoading,
    isError: error,
  };
}
