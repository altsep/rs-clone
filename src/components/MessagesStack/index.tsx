import { Stack } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setCurrentChat } from '../../store/reducers/chatsState';

import ActiveChat from './ActiveChat';
import ChatList from './ChatList';

export default function MessagesStack() {
  // FIX_ME fix all this either on useParams or something else
  const dispatch = useAppDispatch();
  const { chats } = useAppSelector((state) => state.chats);
  const { idAuthorizedUser } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (chats) {
      dispatch(setCurrentChat(idAuthorizedUser !== 13 ? 13 : 15));
    }
  }, [dispatch, idAuthorizedUser, chats]);

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
      <ActiveChat />
    </Stack>
  );
}
