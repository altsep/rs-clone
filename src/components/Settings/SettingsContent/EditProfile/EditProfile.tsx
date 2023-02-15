import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import EditProfileAvatar from './EditProfileAvatar';
import EditProfileForm from './EditProfileForm';

export default function EditProfile() {
  const { t } = useTranslation();
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: '20px' }}>
        {t('settings.editProfile.title')}
      </Typography>
      <EditProfileAvatar />
      <EditProfileForm />
    </Box>
  );
}
