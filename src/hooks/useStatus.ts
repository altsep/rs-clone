import { useEffect } from 'react';
import useUser from './useUser';
import { useAppDispatch, useAppSelector } from './redux';
import { setOnlineStatus } from '../store/reducers/usersState';

export default function useStatus() {
  const dispatch = useAppDispatch();
  const { idCurrentProfile } = useAppSelector((state) => state.users);
  const { user } = useUser(idCurrentProfile);

  useEffect(() => {
    if (user) {
      const { isOnline, lastSeen } = user;
      dispatch(setOnlineStatus({ isOnline, lastSeen }));
    }
  }, [user, dispatch]);
}
