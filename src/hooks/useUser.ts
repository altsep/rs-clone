import useSWR from 'swr';
import { API_BASE_URL, ApiPath } from '../constants';
import { IUser } from '../types/data';
import { fetcher } from '../utils/fetcher';

export default function useUser(id: number) {
  const { data } = useSWR<IUser>(`${API_BASE_URL}${ApiPath.users}/id${id}`, fetcher, {
    refreshInterval: 60000,
  });

  return {
    user: data,
  };
}
