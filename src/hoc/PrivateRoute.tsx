import { CircularProgress } from '@mui/material';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

type TRequire = {
  children: JSX.Element;
};

export default function PrivateRoute({ children }: TRequire) {
  const location = useLocation();
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  if (!isAuth || isLoading) {
    return <CircularProgress sx={{ alignSelf: 'center' }} />;
  }

  return isAuth ? children : <Navigate to="/" state={{ from: location }} />;
}
