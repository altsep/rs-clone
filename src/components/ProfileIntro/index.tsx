import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

export default function ProfileIntro() {
  return (
    <Card>
      <CardHeader title="Intro" />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <LocationOnOutlinedIcon />
          <Typography>Russia</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <CakeOutlinedIcon />
          <Typography>June 18, 2001</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
