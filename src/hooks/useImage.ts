import useSWR from 'swr';
import { getImage } from '../api/imagesApi';
import { API_BASE_URL, ApiPath } from '../constants';

export default function useImage(id: number, name: string) {
  const { data, mutate, isLoading } = useSWR<string>(
    `${API_BASE_URL}${ApiPath.images}?name=${name}&id=${id}`,
    getImage,
    {
      revalidateOnMount: true,
    }
  );

  return {
    data,
    mutate,
    isLoading,
  };
}
