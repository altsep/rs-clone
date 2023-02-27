import { Stack } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import { RoutePath } from '../../constants';
import ActiveChat from './ActiveChat';
import ChatList from './ChatList';

export default function MessagesStack() {
  return (
    <Stack
      direction="row"
      sx={{
        gap: 3,
        borderRadius: { xs: 0, sm: 4 },
        boxShadow: { xs: 0, sm: 4 },
        bgcolor: 'secondary.main',
        width: '100%',
        p: { xs: 0, sm: 3 },
      }}
    >
      <ChatList />
      <Routes>
        <Route path=":id" element={<ActiveChat />} />
        <Route path=":id/*" element={<Navigate to={RoutePath.notFound} />} />
      </Routes>
    </Stack>
  );
}
