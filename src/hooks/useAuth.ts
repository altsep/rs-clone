import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useSWRMutation from 'swr/mutation';
import { useAppDispatch } from './redux';
import { ApiPath, API_BASE_URL, KEY_LOCAL_STORAGE, LSKeys } from '../constants';
import { refreshToken } from '../api/usersApi';
import { ILogin } from '../types/data';
import { getToken, setToken } from '../utils/common';
import { setAuth, setAuthError, setLoading } from '../store/reducers/authSlice';
import { setUser } from '../store/reducers/usersState';

export default function useAuth() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { trigger } = useSWRMutation(`${API_BASE_URL}${ApiPath.refresh}`, refreshToken);

  useEffect(() => {
    const checkAuth = async (): Promise<void> => {
      dispatch(setAuth(false));
      dispatch(setLoading(true));
      try {
        const res: Response | undefined = await trigger();
        if (res?.ok) {
          const resData = (await res?.json()) as ILogin;
          const { accessToken, user } = resData;
          dispatch(setAuth(true));
          setToken(accessToken);
          dispatch(setUser(user));
        } else {
          throw new Error('Authorization error. Re-login required');
        }
      } catch {
        localStorage.removeItem(`${LSKeys.path}_${KEY_LOCAL_STORAGE}`);
        dispatch(setAuthError(true));
      } finally {
        dispatch(setLoading(false));
      }
    };

    const accessToken = getToken();

    if (accessToken) {
      checkAuth().catch((err: Error): Error => err);
    }

    localStorage.setItem(`${LSKeys.path}_${KEY_LOCAL_STORAGE}`, location.pathname);
  }, []);
}
