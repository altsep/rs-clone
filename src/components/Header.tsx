import { Typography, MenuItem, Select, Box, Container, SelectChangeEvent, Avatar } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { styled } from '@mui/material/styles';
import { yellow, purple } from '@mui/material/colors';
import LanguageIcon from '@mui/icons-material/Language';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useState } from 'react';

export default function Header() {
  const [colorMode, setColorMode] = useState<string>('Light');
  const [language, setLanguage] = useState<string>('EN');

  const changeColorMode = (e: SelectChangeEvent<unknown>): void => setColorMode(e.target.value as string);
  const changeLanguage = (e: SelectChangeEvent<unknown>): void => setLanguage(e.target.value as string);

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
              sx={{ mr: '5px', fontSize: 'medium', color: colorMode === 'Light' ? yellow.A700 : purple[600] }}
            />
          }
          defaultValue={colorMode}
          onChange={changeColorMode}
        >
          <MenuItem value="Light" sx={{ fontSize: '0.9rem' }}>
            Light
          </MenuItem>
          <MenuItem value="Dark" sx={{ fontSize: '0.9rem' }}>
            Dark
          </MenuItem>
        </SelectWrapper>
        <SelectWrapper
          startAdornment={<LanguageIcon sx={{ mr: '5px', fontSize: 'medium' }} />}
          defaultValue={language}
          onChange={changeLanguage}
        >
          <MenuItem value="EN" sx={{ fontSize: '0.9rem' }}>
            EN
          </MenuItem>
          <MenuItem value="RU" sx={{ fontSize: '0.9rem' }}>
            RU
          </MenuItem>
        </SelectWrapper>
      </Container>
    </Box>
  );
}
