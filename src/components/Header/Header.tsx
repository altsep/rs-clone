import { Box, Container } from '@mui/material';
import HeaderLogo from './HeaderLogo';
import HeaderSettings from './HeaderSettings';
import Search from '../Search/Search';
import { useAppSelector } from '../../hooks/redux';
import HeaderAvatar from './HeaderAvatar';
import HeaderBurger from './HeaderBurger';

export default function Header() {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  return (
    <Box component="header" sx={{ pt: '5px', pb: '5px', boxShadow: 3, bgcolor: 'secondary.main' }}>
      <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {isAuth && !isLoading && <HeaderBurger />}
        <HeaderLogo />
        {isAuth && !isLoading && (
          <Box sx={{ flex: '1 1 40%', m: '16px', display: { xs: 'none', sm: 'flex' } }}>
            <Search />
          </Box>
        )}
        {!isAuth && !isLoading && <HeaderSettings />}
        {isAuth && !isLoading && <HeaderAvatar />}
      </Container>
    </Box>
  );
}
