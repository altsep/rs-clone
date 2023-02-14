import { CircularProgress } from '@mui/material';
import { Navigate, useLocation } from 'react-router-dom';
import { KEY_LOCAL_STORAGE, LSKeys } from '../constants';
import { useAppSelector } from '../hooks/redux';

type TNotAuth = {
  children: JSX.Element;
};

export default function NotAuthRoute({ children }: TNotAuth) {
  const location = useLocation();
  const userId = useAppSelector((state) => state.users.idAuthorizedUser);
  const user = useAppSelector((state) => state.users.authorizedUser);
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const userPath: string = user?.alias ? `/${user.alias}` : `/id${userId}`;
  const localStoragePath: string | null = localStorage.getItem(`${LSKeys.path}_${KEY_LOCAL_STORAGE}`);

  if (isLoading) {
    return <CircularProgress sx={{ alignSelf: 'center' }} />;
  }

  return isAuth ? (
    <Navigate
      to={localStoragePath && localStoragePath !== '/' ? localStoragePath : userPath}
      state={{ from: location }}
      replace
    />
  ) : (
    children
  );
}
