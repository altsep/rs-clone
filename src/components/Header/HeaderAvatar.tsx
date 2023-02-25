import { Avatar, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import useImage from '../../hooks/useImage';

export default function HeaderAvatar() {
  const { authorizedUser: user, idAuthorizedUser: userId } = useAppSelector((state) => state.users);
  const { data: avatar } = useImage(userId, 'user-avatar');
  return (
    <Box
      sx={{
        flex: '0 1 30%',
        justifyContent: 'flex-end',
        display: { xs: 'none', sm: 'flex', mr: '10px' },
      }}
    >
      <Link to={`/${user?.alias ? user.alias : `id${userId}`}`}>
        <Avatar
          src={avatar}
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
