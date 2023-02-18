import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import HeaderLogoImg from './HeaderLogoImg';
import { useAppSelector } from '../../hooks/redux';

export default function HeaderLogo() {
  const user = useAppSelector((state) => state.users.authorizedUser);
  const LogoWrapper = styled(Box)({
    flex: '0 1 30%',
    display: 'flex',
    a: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textDecoration: 'none',
      color: 'inherit',
      width: 'max-content',
    },
    svg: {
      width: '40px',
      height: '40px',
      margiBottom: '5px',
    },
  });

  return (
    <LogoWrapper sx={{ order: { xs: 3, sm: 0 }, justifyContent: { xs: 'flex-end', sm: 'flex-start' } }}>
      <Link to={user ? `/${user.alias ? `${user.alias}` : `id${user.id}`}` : '/'}>
        <HeaderLogoImg />
        <Typography variant="subtitle2">RSSpace</Typography>
      </Link>
    </LogoWrapper>
  );
}
