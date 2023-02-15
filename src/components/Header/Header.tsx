import { Box, Container } from '@mui/material';
import HeaderLogo from './HeaderLogo';
import HeaderSettings from './HeaderSettings';
import HeaderSearch from './HeaderSearch';

export default function Header() {
  return (
    <Box component="header" sx={{ pt: '10px', pb: '10px', boxShadow: 3, bgcolor: 'secondary.main' }}>
      <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <HeaderLogo />
        <HeaderSearch />
        <HeaderSettings />
      </Container>
    </Box>
  );
}
