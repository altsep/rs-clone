import useSWR from 'swr';
import { API_BASE_URL, ApiPath } from '../constants';
import { IUser } from '../types/data';
import { fetcher } from '../utils/fetcher';

export default function useUser(id: number, refreshInterval = 10000) {
  const { data } = useSWR<IUser>(`${API_BASE_URL}${ApiPath.users}/id${id}`, fetcher, {
    refreshInterval,
  });

  return {
    user: data,
  };
}
