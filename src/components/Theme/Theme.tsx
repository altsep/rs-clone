import { Box, MenuItem, Select, SelectChangeEvent, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeTheme } from '../../store/reducers/themeSlice';

export default function Theme() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.mode);

  const selectThemeHandler = (e: SelectChangeEvent<unknown>): { payload: string; type: 'theme/changeTheme' } =>
    dispatch(changeTheme(e.target.value as string));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <Typography variant="h5" sx={{ mb: '20px' }}>
        {t('settings.theme.title')}
      </Typography>
      <Typography variant="body2" sx={{ mb: '20px' }}>
        {t('settings.theme.subtitle')}
      </Typography>
      <Select
        sx={{
          minWidth: '150px',
          maxHeight: '40px',
          mb: '20px',
          fontSize: '0.8rem',
          color: 'text.secondary',
          fieldset: {
            borderColor: 'text.secondary',
            borderRadius: '8px',
          },
        }}
        value={theme}
        onChange={selectThemeHandler}
      >
        <MenuItem value="light" sx={{ fontSize: '0.8rem' }}>
          {t('settings.theme.selectItems.light')}
        </MenuItem>
        <MenuItem value="dark" sx={{ fontSize: '0.8rem' }}>
          {t('settings.theme.selectItems.dark')}
        </MenuItem>
      </Select>
      <Box>
        <Button sx={{ mr: '10px', color: 'text.secondary' }}>{t('settings.buttons.cancel')}</Button>
        <Button variant="contained" sx={{ borderRadius: '8px' }}>
          {t('settings.buttons.save')}
        </Button>
      </Box>
    </Box>
  );
}
