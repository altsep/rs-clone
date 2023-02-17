import styled from '@emotion/styled';
import { Box, List, ListItemButton, Typography } from '@mui/material';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

export default function SettingsMenu() {
  const { t } = useTranslation();
  const location = useLocation();

  const MenuItemWrapper = styled(ListItemButton)({
    position: 'relative',
    '&.Mui-selected': {
      '&::after': {
        content: '"❯"',
        display: 'inline-block',
        position: 'absolute',
        zIndex: 10,
        right: 10,
        fontSize: '20px',
      },
    },
    a: {
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      color: 'inherit',
      width: '100%',
    },
  });

  return (
    <Box sx={{ flex: { xs: '0 1 auto', md: '0 1 30%' }, pr: '15px', pt: '20px', pl: '20px', pb: '20px' }}>
      <List component="nav">
        <MenuItemWrapper divider selected={location.pathname === '/settings/edit-profile'}>
          <Link to="edit-profile">
            <PersonOutlinedIcon fontSize="small" sx={{ mr: '15px' }} />
            <Typography variant="body2" sx={{ flex: 1, mr: '20px' }}>
              {t('settings.menu.editProfile')}
            </Typography>
          </Link>
        </MenuItemWrapper>
        <MenuItemWrapper divider selected={location.pathname === '/settings/language'}>
          <Link to="language">
            <TranslateOutlinedIcon fontSize="small" sx={{ mr: '15px' }} />
            <Typography variant="body2" sx={{ flex: 1, mr: '20px' }}>
              {' '}
              {t('settings.menu.language')}
            </Typography>
          </Link>
        </MenuItemWrapper>
        <MenuItemWrapper divider selected={location.pathname === '/settings/theme'}>
          <Link to="theme">
            <LightModeIcon fontSize="small" sx={{ mr: '15px' }} />
            <Typography variant="body2" sx={{ flex: 1, mr: '20px' }}>
              {' '}
              {t('settings.menu.theme')}
            </Typography>
          </Link>
        </MenuItemWrapper>
      </List>
    </Box>
  );
}
