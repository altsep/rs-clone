import { useEffect } from 'react';
import { List } from '@mui/material';
import ChatItem from './ChatItem';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setUsersOfExistingChats } from '../../../store/reducers/usersState';

export default function ChatList() {
  const dispatch = useAppDispatch();
  const { chats, usersIdsOfExistingChats } = useAppSelector((state) => state.chats);

  useEffect(() => {
    dispatch(setUsersOfExistingChats(usersIdsOfExistingChats));
  }, [usersIdsOfExistingChats, dispatch]);

  return (
    <List sx={{ background: 'white', p: 2, borderRadius: 4, minHeight: '100%' }}>
      {chats.map((chat) => (
        <ChatItem key={chat.id} chat={chat} />
      ))}
    </List>
  );
}
