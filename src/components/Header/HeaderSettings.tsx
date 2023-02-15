import { MenuItem, Select, SelectChangeEvent, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { yellow, purple } from '@mui/material/colors';
import LanguageIcon from '@mui/icons-material/Language';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeTheme } from '../../store/reducers/themeSlice';
import { switchLanguage } from '../../store/reducers/langSlice';
import { locales, themes } from '../../constants';

export default function HeaderSettings() {
  const dispatch = useAppDispatch();
  const theme: string = useAppSelector((state) => state.theme.mode);
  const language: string = useAppSelector((state) => state.language.lang);

  const selectThemeHandler = (e: SelectChangeEvent<unknown>): { payload: string; type: 'theme/changeTheme' } =>
    dispatch(changeTheme(e.target.value as string));

  const selectLanguageHandler = (e: SelectChangeEvent<unknown>): { payload: string; type: 'language/switchLanguage' } =>
    dispatch(switchLanguage(e.target.value as string));

  const SelectWrapper = styled(Select)({
    fontSize: '0.9rem',
    minWidth: '100px',
    maxHeight: '40px',
    backgroundColor: 'transparent',
    '& fieldset': {
      border: 'none',
    },
  });
  return (
    <Box sx={{ flex: '1 1 30%', display: 'flex', justifyContent: 'flex-end' }}>
      <SelectWrapper
        sx={{ mr: '5px' }}
        startAdornment={
          <LightModeIcon sx={{ mr: '5px', fontSize: 'medium', color: theme === 'light' ? yellow.A700 : purple[600] }} />
        }
        value={theme}
        onChange={selectThemeHandler}
      >
        {themes.map((mode: string) => (
          <MenuItem value={mode} sx={{ fontSize: '0.8rem', textTransform: 'capitalize' }} key={mode}>
            {`${mode.slice(0, 1).toUpperCase()}${mode.slice(1)}`}
          </MenuItem>
        ))}
      </SelectWrapper>
      <SelectWrapper
        startAdornment={<LanguageIcon sx={{ mr: '5px', fontSize: 'medium' }} />}
        value={language}
        onChange={selectLanguageHandler}
      >
        {Object.keys(locales).map((lang: string) => (
          <MenuItem value={lang} sx={{ fontSize: '0.9rem', textTransform: 'capitalize' }} key={lang}>
            {`${lang.slice(0, 1).toUpperCase()}${lang.slice(1)}`}
          </MenuItem>
        ))}
      </SelectWrapper>
    </Box>
  );
}
