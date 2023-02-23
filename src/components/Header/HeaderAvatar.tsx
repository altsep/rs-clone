import { Avatar, Box } from '@mui/material';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import useImage from '../../hooks/useImage';
import { setAvatar } from '../../store/reducers/usersState';

export default function HeaderAvatar() {
  const dispatch = useAppDispatch();
  const { authorizedUser, idAuthorizedUser, avatarUrl } = useAppSelector((state) => state.users);
  const { data: avatar } = useImage(idAuthorizedUser, 'user-avatar');

  useEffect(() => {
    if (avatar) {
      dispatch(setAvatar(avatar));
    }
  }, [avatar, dispatch]);

  return (
    <Box
      sx={{
        flex: '0 1 30%',
        justifyContent: 'flex-end',
        display: { xs: 'none', sm: 'flex', mr: '10px' },
      }}
    >
      <Link to={`/${authorizedUser?.alias ? authorizedUser.alias : `id${idAuthorizedUser}`}`}>
        <Avatar
          src={avatarUrl}
          alt="User Avatar"
          sx={{
            width: '50px',
            height: '50px',
          }}
        />
      </Link>
    </Box>
  );
}
