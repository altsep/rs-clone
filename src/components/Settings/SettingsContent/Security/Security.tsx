import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import HideUserInfo from './HideUserInfo';
import ChangePassword from './ChangePassword';
import DeleteAccount from './DeleteAccount';

export default function Security() {
  const { t } = useTranslation();
  return (
    <Stack sx={{ minWidth: '100%', alignItems: 'flex-start' }}>
      <Typography variant="h6" sx={{ mb: '20px' }}>
        {t('settings.security.title')}
      </Typography>
      <HideUserInfo />
      <ChangePassword />
      <DeleteAccount />
    </Stack>
  );
}
