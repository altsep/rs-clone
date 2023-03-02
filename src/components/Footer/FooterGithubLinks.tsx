import { Link, Box, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import FooterGithubLogo from './FooterGithubLogo';

type ILinks = {
  path: string;
  name: string;
};

const links: Array<ILinks> = [
  {
    path: 'https://github.com/altsep',
    name: 'altsep',
  },
  {
    path: 'https://github.com/krevetka87',
    name: 'krevetka87',
  },
  {
    path: 'https://github.com/MetalKnock',
    name: 'MetalKnock',
  },
];

export default function FooterGithubLinks() {
  const { t } = useTranslation();
  return (
    <Box sx={{ justifySelf: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ display: 'flex' }}>
        <FooterGithubLogo />
        <Typography sx={{ mb: '10px', fontWeight: 700 }}>{t('footer.team')}</Typography>
      </Box>
      <Stack direction="row" sx={{ gap: '15px ' }}>
        {links.map((link: ILinks) => (
          <Link
            target="_blank"
            href={link.path}
            key={link.name}
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              mb: '5px',
            }}
          >
            <Typography variant="body2">{link.name}</Typography>
          </Link>
        ))}
      </Stack>
    </Box>
  );
}
