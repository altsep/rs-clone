import { grey } from '@mui/material/colors';
import { List } from '@mui/material';
import ChatItem from './ChatItem';
import { useAppSelector } from '../../../hooks/redux';

export default function ChatList() {
  const { chats } = useAppSelector((state) => state.chats);
  const { usersOfExistingChats } = useAppSelector((state) => state.users);

  return (
    <List sx={{ background: grey[50], p: 2, borderRadius: 4, minHeight: '100%', flex: '1 1 auto' }}>
      {chats.map((chat, i) => (
        <ChatItem key={chat.id} chat={chat} user={usersOfExistingChats[i]} />
      ))}
    </List>
  );
}
