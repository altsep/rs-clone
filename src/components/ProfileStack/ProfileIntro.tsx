import { Box, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../hooks/redux';

export default function ProfileIntro() {
  const { t } = useTranslation();
  const currentLocale = useAppSelector((state) => state.language.lang);
  const { currentProfile } = useAppSelector((state) => state.users);

  return (
    <Card sx={{ borderRadius: { xs: 0, sm: 4 }, boxShadow: { xs: 0, sm: 4, md: 0 } }}>
      <CardHeader title={t('profile.intro')} sx={{ textAlign: 'center' }} />
      <Divider />
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
              new Date(currentProfile.birthDate).toLocaleString(currentLocale, {
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
