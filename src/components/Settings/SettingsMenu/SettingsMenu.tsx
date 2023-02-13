import styled from '@emotion/styled';
import { Box, List, ListItemButton } from '@mui/material';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function SettingsMenu() {
  const { t } = useTranslation();

  const MenuItemWrapper = styled(ListItemButton)({
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.8rem',
    a: {
      color: 'inherit',
      textDecoration: 'none',
      fontSize: '14px',
    },
  });
  return (
    <Box sx={{ flex: '0 1 25%', pr: '15px', pt: '20px', pl: '20px', pb: '20px' }}>
      <List component="nav">
        <MenuItemWrapper divider>
          <PersonOutlinedIcon fontSize="small" sx={{ mr: '15px' }} />
          <Link to="edit-profile">{t('settings.menu.editProfile')}</Link>
        </MenuItemWrapper>
        <MenuItemWrapper divider>
          <TranslateOutlinedIcon fontSize="small" sx={{ mr: '15px' }} />
          <Link to="language">{t('settings.menu.language')}</Link>
        </MenuItemWrapper>
        <MenuItemWrapper divider>
          <LightModeIcon fontSize="small" sx={{ mr: '15px' }} />
          <Link to="theme">{t('settings.menu.theme')}</Link>
        </MenuItemWrapper>
      </List>
    </Box>
  );
}
