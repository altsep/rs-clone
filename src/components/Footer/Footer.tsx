import { Box, Container, Divider, Typography } from '@mui/material';
import FooterGithubLinks from './FooterGithubLinks';
import FooterRSLink from './FooterRSLink';
import HeaderLogo from '../Header/HeaderLogo';

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'secondary.main' }}>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: '15px',
          pb: '15px',
        }}
      >
        <Box sx={{ minWidth: '100%' }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', pb: '10px' }}>
            <Box sx={{ justifySelf: 'start' }}>
              <HeaderLogo />
              <Typography variant="body2" sx={{ mt: '10px' }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem cum molestias consequuntur quae. Cumque,
                consequatur dolores repudiandae quam nam eveniet.
              </Typography>
            </Box>
            <FooterGithubLinks />
            <Box sx={{ justifySelf: 'end' }}>
              <Typography sx={{ mb: '10px', fontWeight: 700 }}>Courses:</Typography>
              <FooterRSLink />
            </Box>
          </Box>
          <Divider />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ pt: '20px' }}>
          RSSpace © 2023
        </Typography>
      </Container>
    </Box>
  );
}
