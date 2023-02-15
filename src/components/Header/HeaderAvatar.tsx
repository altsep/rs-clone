import { Avatar, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

export default function HeaderAvatar() {
  const user = useAppSelector((state) => state.users.authorizedUser);
  return (
    <Box sx={{ flex: '0 1 30%', display: 'flex', justifyContent: 'flex-end' }}>
      <Link to={`/${user?.alias ? user.alias : `id${user?.id as number}`}`}>
        <Avatar
          src={user?.avatarURL}
          alt="User Avatar"
          sx={{
            width: '50px',
            height: '50px',
            display: { xs: 'none', sm: 'flex', mr: '10px' },
          }}
        />
      </Link>
    </Box>
  );
}
