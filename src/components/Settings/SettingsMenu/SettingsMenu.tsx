import styled from '@emotion/styled';
import { Box, List, ListItemButton, Typography } from '@mui/material';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function SettingsMenu() {
  const { t } = useTranslation();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState<string>('edit');

  const MenuItemWrapper = styled(ListItemButton)({
    a: {
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      color: 'inherit',
      width: '100%',
    },
  });

  return (
    <Box sx={{ flex: '0 1 30%', pr: '15px', pt: '20px', pl: '20px', pb: '20px' }}>
      <List component="nav">
        <MenuItemWrapper
          divider
          selected={location.pathname === '/settings/edit-profile'}
          onClick={(): void => setActiveItem('edit')}
        >
          <Link to="edit-profile">
            <PersonOutlinedIcon fontSize="small" sx={{ mr: '15px' }} />
            <Typography variant="body2" sx={{ flex: 1 }}>
              {t('settings.menu.editProfile')}
            </Typography>
            {activeItem === 'edit' && <ArrowForwardIosIcon fontSize="small" />}
          </Link>
        </MenuItemWrapper>
        <MenuItemWrapper
          divider
          selected={location.pathname === '/settings/language'}
          onClick={(): void => setActiveItem('language')}
        >
          <Link to="language">
            <TranslateOutlinedIcon fontSize="small" sx={{ mr: '15px' }} />
            <Typography variant="body2" sx={{ flex: 1 }}>
              {' '}
              {t('settings.menu.language')}
            </Typography>
            {activeItem === 'language' && <ArrowForwardIosIcon fontSize="small" />}
          </Link>
        </MenuItemWrapper>
        <MenuItemWrapper
          divider
          selected={location.pathname === '/settings/theme'}
          onClick={(): void => setActiveItem('theme')}
        >
          <Link to="theme">
            <LightModeIcon fontSize="small" sx={{ mr: '15px' }} />
            <Typography variant="body2" sx={{ flex: 1 }}>
              {' '}
              {t('settings.menu.theme')}
            </Typography>
            {activeItem === 'theme' && <ArrowForwardIosIcon fontSize="small" />}
          </Link>
        </MenuItemWrapper>
      </List>
    </Box>
  );
}
