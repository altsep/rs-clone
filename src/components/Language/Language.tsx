import { Box, Button, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { switchLanguage } from '../../store/reducers/langSlice';

export default function Language() {
  const { t } = useTranslation();
  const language = useAppSelector((state) => state.language.lang);
  const dispatch = useAppDispatch();

  const selectLanguageHandler = (e: SelectChangeEvent<unknown>): { payload: string; type: 'language/switchLanguage' } =>
    dispatch(switchLanguage(e.target.value as string));

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: '20px' }}>
        {t('settings.language.title')}
      </Typography>
      <Typography variant="body2" sx={{ mb: '20px' }}>
        {t('settings.language.subtitle')}
      </Typography>
      <Select
        sx={{
          minWidth: '150px',
          maxHeight: '40px',
          mb: '20px',
          fontSize: '0.8rem',
          fieldset: {
            borderColor: 'secondary.contrastText',
            borderRadius: '8px',
          },
        }}
        value={language}
        onChange={selectLanguageHandler}
      >
        <MenuItem value="en" sx={{ fontSize: '0.8rem' }}>
          English
        </MenuItem>
        <MenuItem value="ru" sx={{ fontSize: '0.8rem' }}>
          Русский
        </MenuItem>
        <MenuItem value="es" sx={{ fontSize: '0.8rem' }}>
          Español
        </MenuItem>
      </Select>
      <Box>
        <Button sx={{ mr: '10px' }}>Cancel</Button>
        <Button>Save</Button>
      </Box>
    </Box>
  );
}
