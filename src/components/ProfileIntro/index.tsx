import { useParams } from 'react-router-dom';
import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import useUser from '../../hooks/useUser';
import { currentLocales } from '../../mock-data/data';

export default function ProfileIntro() {
  const { id: idCurrentProfile } = useParams();

  const { user } = useUser(Number(idCurrentProfile));

  return (
    <Card>
      <CardHeader title="Intro" />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <LocationOnOutlinedIcon />
          <Typography sx={{ textTransform: 'capitalize' }}>{user && user.country}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
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
