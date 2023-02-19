import { useEffect } from 'react';
import useSWR from 'swr';
import { API_BASE_URL } from '../constants';
import { fetcher } from '../utils/fetcher';
import { useAppDispatch } from './redux';
import { usersLoadingSuccess } from '../store/reducers/usersState';
import { postsLoadingSuccess } from '../store/reducers/postsState';
import { commentsLoadingSuccess } from '../store/reducers/commentsState';
import { IComment, IPost, IUser } from '../types/data';

type TPath = '/users' | '/posts' | '/comments';
type TData = IUser[] & IPost[] & IComment[];

const actions = {
  '/users': usersLoadingSuccess,
  '/posts': postsLoadingSuccess,
  '/comments': commentsLoadingSuccess,
};

export default function useData(path: TPath) {
  const { data, isLoading, error, mutate, isValidating } = useSWR<TData, Error>(`${API_BASE_URL}${path}`, fetcher);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data && !isLoading && !isValidating) {
      const action = actions[path];
      dispatch(action(data));
    }
  }, [path, data, isLoading, isValidating, dispatch]);

  return {
    data,
    isLoading,
    error,
    mutate,
    isValidating,
  };
}
