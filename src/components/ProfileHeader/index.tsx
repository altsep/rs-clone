import { Box, Button, Typography, Badge, Avatar, IconButton } from '@mui/material';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';

export default function ProfileHeader() {
  return (
    <Box sx={{ borderRadius: 2, boxShadow: 1 }}>
      <Box sx={{ position: 'relative' }}>
        <Box
          component="img"
          src="https://wallpaperaccess.com/full/106956.jpg"
          alt="Background image"
          sx={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: 2 }}
        />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'absolute',
            bottom: -20,
            left: 0,
            px: '1%',
            width: '98%',
          }}
        >
          <Badge
            overlap="circular"
            badgeContent={
              <IconButton sx={{ background: 'white', p: 0.5, borderRadius: '50%', minWidth: '0' }}>
                <input hidden accept="image/*" type="file" />
                <CloudDownloadOutlinedIcon />
              </IconButton>
            }
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <Avatar alt="Avatar" sx={{ width: 150, height: 150, border: 3, borderColor: 'common.white' }} />
          </Badge>
          <Button variant="contained" startIcon={<CloudDownloadOutlinedIcon />}>
            Edit Cover Photo
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2, pb: 3, pt: 5 }}>
        <Typography variant="h5">Saleh Ahmed</Typography>
        <Button>Edit basic info</Button>
      </Box>
    </Box>
  );
}
