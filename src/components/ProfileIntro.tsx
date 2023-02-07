import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import useUser from '../hooks/useUser';
import { currentLocales } from '../mock-data/data';
import useParamsIdCurrentProfile from '../hooks/useParamsIdCurrentProfile';

export default function ProfileIntro() {
  const { idCurrentProfile } = useParamsIdCurrentProfile();

  const { user } = useUser(idCurrentProfile);

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
          <Typography sx={{ textTransform: 'capitalize' }}>{user && user.country}</Typography>
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
            {user &&
              new Date(user.birthDate).toLocaleString(currentLocales, {
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
