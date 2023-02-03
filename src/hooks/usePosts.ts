import useSWR from 'swr';
import { BASE_URL, PATH } from '../constants';
import { IPosts } from '../types/data';
import { fetcher } from '../utils/fetcher';

export default function usePost() {
  const { data, isLoading, error, mutate } = useSWR<IPosts, Error>(`${BASE_URL}${PATH.posts}`, fetcher);

  return {
    posts: data,
    isLoading,
    isError: error,
    mutate,
  };
}
