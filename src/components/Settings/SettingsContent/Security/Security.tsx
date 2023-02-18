import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import HideUserInfo from '../../../HideUserInfo/HideUserInfo';
import ChangePassword from './ChangePassword';

export default function Security() {
  const { t } = useTranslation();
  return (
    <Stack sx={{ minWidth: '100%' }}>
      <Typography variant="h6" sx={{ mb: '20px' }}>
        {t('settings.security.title')}
      </Typography>
      <HideUserInfo />
      <ChangePassword />
    </Stack>
  );
}
