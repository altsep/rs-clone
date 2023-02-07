import { Avatar, Box, Typography } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

export default function FormHeader({ children }: { children: string }) {
  return (
    <Box sx={{ mb: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Avatar sx={{ bgcolor: 'primary.main', mb: '10px' }}>
        <PersonOutlineIcon />
      </Avatar>
      <Typography>{children}</Typography>
    </Box>
  );
}
