import { Box, Container, Typography } from '@mui/material';
import FooterGithubLinks from './FooterGithubLinks';
import FooterRSLink from './FooterRSLink';

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'secondary.main' }}>
      <Container
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: '15px', pb: '15px' }}
      >
        <FooterGithubLinks />
        <Typography variant="body2" color="text.secondary">
          RSSpace © 2023
        </Typography>
        <FooterRSLink />
      </Container>
    </Box>
  );
}
