import { Button, Stack, Typography } from '@mui/material';
import WestIcon from '@mui/icons-material/West';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

export default function NotFound() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuth } = useAppSelector((state) => state.auth);
  const { idAuthorizedUser, authorizedUser } = useAppSelector((state) => state.users);

  const onClick = (): void => {
    navigate(!isAuth ? '/' : `${authorizedUser?.alias ? `/${authorizedUser?.alias}` : `/id${idAuthorizedUser}`}`);
  };

  return (
    <Stack sx={{ mt: '5vh', mb: '5vh', pr: '10px', pl: '10px' }}>
      <Typography variant="h4" sx={{ mb: '10px' }}>
        Oops....
      </Typography>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: '10px' }}>
        {t('404.title')}
      </Typography>
      <Typography sx={{ mb: '40px' }}>{t('404.text')}</Typography>
      <Button variant="contained" startIcon={<WestIcon />} sx={{ alignSelf: 'flex-start' }} onClick={onClick}>
        {t('404.link')}
      </Button>
    </Stack>
  );
}
