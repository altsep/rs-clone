import { Box } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import { RoutePath } from '../../../constants';
import EditProfile from './EditProfile/EditProfile';
import Language from './Language/Language';
import Security from './Security/Security';
import Theme from './Theme/Theme';

export default function SettingsContent() {
  return (
    <Box sx={{ flex: { xs: '0 1 auto', md: '0 1 70%' }, p: '20px', display: 'flex' }}>
      <Routes>
        <Route index element={<Navigate to={RoutePath.editProfile} replace />} />
        <Route path={RoutePath.language} element={<Language />} />
        <Route path={RoutePath.editProfile} element={<EditProfile />} />
        <Route path={RoutePath.theme} element={<Theme />} />
        <Route path={RoutePath.security} element={<Security />} />
      </Routes>
    </Box>
  );
}
