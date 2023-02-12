import { Box, Button, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { switchLanguage } from '../../store/reducers/langSlice';

export default function Language() {
  const { t } = useTranslation();
  const languageState = useAppSelector((state) => state.language.lang);
  const [language, setLanguage] = useState<string>(languageState);
  const dispatch = useAppDispatch();

  const onSave = (): { payload: string; type: 'language/switchLanguage' } => dispatch(switchLanguage(language));
  const onChange = (e: SelectChangeEvent): void => setLanguage(e.target.value);
  const onCancel = (): void => setLanguage(languageState);

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: '20px' }}>
        {t('settings.language.title')}
      </Typography>
      <Typography variant="body2" sx={{ mb: '20px' }}>
        {t('settings.language.subtitle')}
      </Typography>
      <Box sx={{ maxWidth: 'max-content', display: 'flex', flexDirection: 'column' }}>
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
          value={language}
          onChange={onChange}
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
          <Button sx={{ mr: '10px', color: 'text.secondary' }} onClick={onCancel}>
            {t('settings.buttons.cancel')}
          </Button>
          <Button variant="contained" sx={{ borderRadius: '8px' }} onClick={onSave}>
            {t('settings.buttons.save')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
