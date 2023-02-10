import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { currentLocales } from '../../mock-data/data';
import { useAppSelector } from '../../hooks/redux';

export default function ProfileIntro() {
  const { currentProfile } = useAppSelector((state) => state.users);

  return (
    <Card>
      <CardHeader title="Intro" sx={{ textAlign: 'center' }} />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: { xs: 'center', md: 'start' },
          }}
        >
          <LocationOnOutlinedIcon />
          <Typography sx={{ textTransform: 'capitalize', wordBreak: 'break-all' }}>
            {currentProfile && currentProfile.country}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: { xs: 'center', md: 'start' },
          }}
        >
          <CakeOutlinedIcon />
          <Typography>
            {currentProfile &&
              new Date(currentProfile.birthDate).toLocaleString(currentLocales, {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
