import { Box, MenuItem, Select, SelectChangeEvent, Typography, Button } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeTheme } from '../../store/reducers/themeSlice';

export default function Theme() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const themeState = useAppSelector((state) => state.theme.mode);
  const [theme, setTheme] = useState<string>(themeState);

  const onSave = (): { payload: string; type: 'theme/changeTheme' } => dispatch(changeTheme(theme));
  const onChange = (e: SelectChangeEvent): void => setTheme(e.target.value);
  const onCancel = (): void => setTheme(themeState);

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: '20px' }}>
        {t('settings.theme.title')}
      </Typography>
      <Typography variant="body2" sx={{ mb: '20px' }}>
        {t('settings.theme.subtitle')}
      </Typography>
      <Box sx={{ maxWidth: 'max-content', display: 'flex', flexDirection: 'column' }}>
        <Select
          sx={{
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
          onChange={onChange}
        >
          <MenuItem value="light" sx={{ fontSize: '0.8rem' }}>
            {t('settings.theme.selectItems.light')}
          </MenuItem>
          <MenuItem value="dark" sx={{ fontSize: '0.8rem' }}>
            {t('settings.theme.selectItems.dark')}
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
