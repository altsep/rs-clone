import { Link, Box, Stack, Typography } from '@mui/material';
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
  return (
    <Box sx={{ justifySelf: 'center' }}>
      <Box sx={{ display: 'flex' }}>
        <FooterGithubLogo />
        <Typography sx={{ mb: '10px', fontWeight: 700 }}>Our team: </Typography>
      </Box>
      <Stack>
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
