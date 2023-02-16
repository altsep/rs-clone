import useSWR from 'swr';
import { API_BASE_URL, ApiPath } from '../constants';
import { IComment } from '../types/data';
import { fetcher } from '../utils/fetcher';

export default function useComments() {
  const { data, isLoading, error, mutate, isValidating } = useSWR<IComment[], Error>(
    `${API_BASE_URL}${ApiPath.comments}`,
    fetcher
  );

  return {
    comments: data,
    isLoadingComments: isLoading,
    isErrorComments: error,
    mutate,
    isValidatingComments: isValidating,
  };
}
