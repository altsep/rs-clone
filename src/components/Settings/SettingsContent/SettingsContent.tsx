import { Box } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import EditProfile from './EditProfile/EditProfile';
import Language from './Language/Language';
import Theme from './Theme/Theme';

export default function SettingsContent() {
  return (
    <Box sx={{ flex: { xs: '0 1 auto', md: '0 1 70%' }, p: '20px', display: 'flex' }}>
      <Routes>
        <Route index element={<Navigate to="edit-profile" replace />} />
        <Route path="language" element={<Language />} />
        <Route index path="edit-profile" element={<EditProfile />} />
        <Route path="theme" element={<Theme />} />
      </Routes>
    </Box>
  );
}
