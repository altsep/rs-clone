import { Alert, Snackbar } from '@mui/material';
import { useTranslation } from 'react-i18next';

type TImageAlert = {
  open: boolean;
  handleCloseError: () => void;
};

export default function ImageAlert({ open, handleCloseError }: TImageAlert) {
  const { t } = useTranslation();
  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={handleCloseError}
      sx={{ width: '400px', maxWidth: '100%' }}
    >
      <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
        {t('imageAlert')}
      </Alert>
    </Snackbar>
  );
}
