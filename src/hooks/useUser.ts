import useSWR from 'swr';
import { useAppSelector } from './redux';
import { API_BASE_URL, ApiPath } from '../constants';
import { IUser } from '../types/data';
import { fetcher } from '../utils/fetcher';

export default function useUser(id: number, refreshInterval = 10000) {
  const { idAuthorizedUser } = useAppSelector((state) => state.users);

  const { data } = useSWR<IUser>(id !== idAuthorizedUser && `${API_BASE_URL}${ApiPath.users}/id${id}`, fetcher, {
    refreshInterval,
  });

  return {
    user: data,
  };
}
