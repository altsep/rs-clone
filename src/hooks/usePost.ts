import useSWR from 'swr';
import { API_BASE_URL, ApiPath } from '../constants';
import { IPost } from '../types/data';
import { fetcher } from '../utils/fetcher';

export default function usePost(id: number) {
  const { data, error, isLoading, mutate } = useSWR<IPost, Error>(`${API_BASE_URL}${ApiPath.posts}/${id}`, fetcher);

  return {
    post: data,
    isLoading,
    isError: error,
    mutate,
  };
}
