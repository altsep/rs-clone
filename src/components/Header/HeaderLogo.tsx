import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import HeaderLogoImg from './HeaderLogoImg';

export default function HeaderLogo() {
  const LogoWrapper = styled(Box)({
    flex: '1 1 30%',
    a: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      textDecoration: 'none',
      color: 'inherit',
      width: 'max-content',
    },
    svg: {
      width: '40px',
      height: '40px',
      marginRight: '15px',
    },
  });

  return (
    <LogoWrapper>
      <Link to="/">
        <HeaderLogoImg />
        <Typography variant="subtitle2">RSSpace</Typography>
      </Link>
    </LogoWrapper>
  );
}
