import { Box, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

type TFormFooter = {
  children: string;
  linkTo: string;
  linkTitle: string;
};

export default function FormFooter({ children, linkTo, linkTitle }: TFormFooter) {
  const { breakpoints } = useTheme();
  const { up } = breakpoints;
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        [up('sm')]: { flexDirection: 'row' },
      }}
    >
      <Typography variant="body2" sx={{ mr: '10px' }}>
        {children}
      </Typography>
      <Typography sx={{ a: { color: 'primary.main', textDecoration: 'none' } }}>
        <Link to={linkTo}>{linkTitle}</Link>
      </Typography>
    </Box>
  );
}
