import { Typography, Box, Container } from '@mui/material';

export default function Header() {
  return (
    <Box component="header" sx={{ pt: '20px', pb: '20px' }}>
      <Container sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography flex={1}>Logo</Typography>
      </Container>
    </Box>
  );
}
