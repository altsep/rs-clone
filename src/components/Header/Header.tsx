import { Typography, MenuItem, Select, Box, Container, SelectChangeEvent, Avatar } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { styled } from '@mui/material/styles';
import { yellow, purple } from '@mui/material/colors';
import LanguageIcon from '@mui/icons-material/Language';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeTheme } from '../../store/reducers/themeSlice';
import { switchLanguage } from '../../store/reducers/langSlice';
import { locales, themes } from '../../constants';

export default function Header() {
  const dispatch = useAppDispatch();
  const theme: string = useAppSelector((state) => state.theme.mode);
  const language: string = useAppSelector((state) => state.language.lang);

  const selectThemeHandler = (e: SelectChangeEvent<unknown>): { payload: string; type: 'theme/changeTheme' } =>
    dispatch(changeTheme(e.target.value as string));

  const selectLanguageHandler = (e: SelectChangeEvent<unknown>): { payload: string; type: 'language/switchLanguage' } =>
    dispatch(switchLanguage(e.target.value as string));

  const SelectWrapper = styled(Select)({
    fontSize: '0.9rem',
    marginRight: '20px',
    minWidth: '100px',
    maxHeight: '40px',
    backgroundColor: 'transparent',
    '& fieldset': {
      border: 'none',
    },
  });

  return (
    <Box component="header" sx={{ pt: '10px', pb: '10px', boxShadow: 4, bgcolor: 'secondary.main' }}>
      <Container sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar variant="rounded" sx={{ bgcolor: 'primary.main', width: '25px', height: '25px', mr: '10px' }}>
          <ChatIcon fontSize="small" />
        </Avatar>
        <Typography variant="body2" sx={{ flex: 1, fontWeight: '700' }}>
          RSSpace
        </Typography>
        <SelectWrapper
          startAdornment={
            <LightModeIcon
              sx={{ mr: '5px', fontSize: 'medium', color: theme === 'light' ? yellow.A700 : purple[600] }}
            />
          }
          value={theme}
          onChange={selectThemeHandler}
        >
          {themes.map((mode: string) => (
            <MenuItem value={mode} sx={{ fontSize: '0.9rem' }} key={mode}>
              {mode.toUpperCase()}
            </MenuItem>
          ))}
        </SelectWrapper>
        <SelectWrapper
          startAdornment={<LanguageIcon sx={{ mr: '5px', fontSize: 'medium' }} />}
          value={language}
          onChange={selectLanguageHandler}
        >
          {Object.keys(locales).map((lang: string) => (
            <MenuItem value={lang} sx={{ fontSize: '0.9rem' }} key={lang}>
              {lang.toUpperCase()}
            </MenuItem>
          ))}
        </SelectWrapper>
      </Container>
    </Box>
  );
}
