import { useLocation } from 'react-router-dom';
import { grey } from '@mui/material/colors';
import { List } from '@mui/material';
import ChatItem from './ChatItem';
import { useAppSelector } from '../../../hooks/redux';
import { RoutePath } from '../../../constants';

export default function ChatList() {
  const location = useLocation();

  const { chats, numberOfUnreadMessagesInChats } = useAppSelector((state) => state.chats);
  const { usersOfExistingChats, idAuthorizedUser } = useAppSelector((state) => state.users);

  return (
    <List
      sx={{
        background: grey[50],
        p: 2,
        borderRadius: 4,
        minHeight: '100%',
        flex: location.pathname === `${RoutePath.messages}` ? '1 1 auto' : '0 0 30%',
        display: { xs: location.pathname === `${RoutePath.messages}` ? 'block' : 'none', md: 'block' },
      }}
    >
      {chats.map((chat, i) => (
        <ChatItem
          key={chat.id}
          chat={chat}
          user={usersOfExistingChats[i]}
          numberOfUnreadMessages={
            numberOfUnreadMessagesInChats &&
            numberOfUnreadMessagesInChats.find(
              (numberOfUnreadMessages) =>
                numberOfUnreadMessages.userId === +chat.userIds.filter((userId) => userId !== idAuthorizedUser).join()
            )?.counter
          }
        />
      ))}
    </List>
  );
}
