import styled from '@emotion/styled';
import { Container, Box, List, ListItem, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link, Route, Routes } from 'react-router-dom';
import EditProfile from '../components/EditProfile/EditProfile';
import Language from '../components/Language/Language';
import Theme from '../components/Theme/Theme';

export default function Settings() {
  const { t } = useTranslation();
  const ListItemWrapper = styled(ListItem)({
    a: {
      color: 'inherit',
      textDecoration: 'none',
    },
  });

  return (
    <Container sx={{ mt: '5vh', mb: '5vh', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          borderRadius: 4,
          boxShadow: 4,
          display: 'flex',
          bgcolor: 'secondary.main',
          flex: 1,
        }}
      >
        <Box sx={{ flex: '0 1 20%', pr: '15px', pt: '20px', pl: '20px', pb: '20px' }}>
          <List>
            <ListItemWrapper divider>
              <Link to="edit-profile">{t('settings.menu.editProfile')}</Link>
            </ListItemWrapper>
            <ListItemWrapper divider>
              <Link to="language">{t('settings.menu.language')}</Link>
            </ListItemWrapper>
            <ListItemWrapper divider>
              <Link to="theme">{t('settings.menu.theme')}</Link>
            </ListItemWrapper>
          </List>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box sx={{ flex: 1, p: '20px' }}>
          <Routes>
            <Route path="language" element={<Language />} />
            <Route path="*" element={<EditProfile />} />
            <Route path="theme" element={<Theme />} />
          </Routes>
        </Box>
      </Box>
    </Container>
  );
}
