import { Box, Container, Divider, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import FooterGithubLinks from './FooterGithubLinks';
import FooterRSLink from './FooterRSLink';
import FooterLogo from './FooterLogo';

export default function Footer() {
  const { t } = useTranslation();
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
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                sm: 'repeat(1, 1fr)',
                md: 'repeat(3, 1fr)',
              },
              pb: '10px',
              gap: '20px 40px',
            }}
          >
            <Box
              sx={{
                justifySelf: {
                  xs: 'center',
                  md: 'start',
                },
                display: 'flex',
                flexDirection: {
                  xs: 'row',
                  md: 'column',
                },
                alignItems: {
                  xs: 'center',
                  md: 'flex-start',
                },
              }}
            >
              <FooterLogo />
              <Typography variant="body2" sx={{ mt: '10px', maxWidth: '300px' }}>
                {t('footer.description')}
              </Typography>
            </Box>
            <FooterGithubLinks />
            <Box
              sx={{
                justifySelf: {
                  xs: 'center',
                  md: 'end',
                },
              }}
            >
              <Typography sx={{ mb: '10px', fontWeight: 700 }}>{t('footer.courses')}</Typography>
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
