import { Typography, Stack, Box } from '@mui/material';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import { useTranslation } from 'react-i18next';

export default function ProfileHidden() {
  const { t } = useTranslation();

  return (
    <Stack
      direction="row"
      sx={{
        alignItems: 'center',
        borderRadius: 4,
        boxShadow: { xs: 0, md: 4 },
        bgcolor: { xs: 'none', md: 'secondary.main' },
        pt: 4,
        pb: 4,
        pr: { xs: 0, md: 2 },
        pl: { xs: 0, md: 2 },
      }}
    >
      <LockPersonOutlinedIcon fontSize="large" sx={{ mr: 3 }} />
      <Box sx={{ maxWidth: 400 }}>
        <Typography variant="h6">{t('profile.hiddenUser')}</Typography>
      </Box>
    </Stack>
  );
}
