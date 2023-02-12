import useSWR from 'swr';
import { API_BASE_URL, ApiPath } from '../constants';
import { IPost } from '../types/data';
import { fetcher } from '../utils/fetcher';

export default function usePosts() {
  const { data, isLoading, error, mutate, isValidating } = useSWR<IPost[], Error>(
    `${API_BASE_URL}${ApiPath.posts}`,
    fetcher
  );

  return {
    posts: data,
    isLoadingPosts: isLoading,
    isErrorPosts: error,
    mutate,
    isValidatingPosts: isValidating,
  };
}
