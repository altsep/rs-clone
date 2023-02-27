import useSWR from 'swr';
import { getImage } from '../api/imagesApi';
import { API_BASE_URL, ApiPath } from '../constants';

export default function useImage(id: number, name: string) {
  const key = `${API_BASE_URL}${ApiPath.images}?name=${name}&id=${id}`;
  const { data, mutate, isLoading } = useSWR<string>(key, getImage);

  return {
    data,
    mutate,
    isLoading,
  };
}
