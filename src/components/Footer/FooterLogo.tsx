import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import HeaderLogoImg from '../Header/HeaderLogoImg';
import { useAppSelector } from '../../hooks/redux';

export default function FooterLogo() {
  const user = useAppSelector((state) => state.users.authorizedUser);
  const LogoWrapper = styled(Box)({
    marginRight: '15px',
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
    <LogoWrapper>
      <Link to={user ? `/${user.alias ? `${user.alias}` : `id${user.id}`}` : '/'}>
        <HeaderLogoImg />
        <Typography variant="subtitle2">RSSpace</Typography>
      </Link>
    </LogoWrapper>
  );
}
