import { Stack } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import ActiveChat from './ActiveChat';
import ChatList from './ChatList';

export default function MessagesStack() {
  return (
    <Stack
      direction="row"
      sx={{
        gap: 3,
        borderRadius: 4,
        boxShadow: 4,
        bgcolor: 'secondary.main',
        width: '100%',
        p: 3,
      }}
    >
      <ChatList />
      <Routes>
        <Route path=":id" element={<ActiveChat />} />
      </Routes>
    </Stack>
  );
}
