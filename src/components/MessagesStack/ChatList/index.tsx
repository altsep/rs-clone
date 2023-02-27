import { useLocation } from 'react-router-dom';
import { Box, CircularProgress, List, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ChatItem from './ChatItem';
import { useAppSelector } from '../../../hooks/redux';
import { RoutePath } from '../../../constants';
import useUsers from '../../../hooks/useUsers';
import useUserChats from '../../../hooks/useUserChats';

export default function ChatList() {
  const location = useLocation();
  const { t } = useTranslation();

  const { chats, numberOfUnreadMessagesInChats } = useAppSelector((state) => state.chats);
  const { usersOfExistingChats, idAuthorizedUser } = useAppSelector((state) => state.users);

  const { isLoadingUsers } = useUsers();
  const { isLoadingChats } = useUserChats(idAuthorizedUser);

  if (!isLoadingChats && !isLoadingUsers && chats.length === 0) {
    return (
      <Typography
        variant="h5"
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {t('messages.empty')}
      </Typography>
    );
  }

  return (
    <List
      sx={{
        boxShadow: { xs: 4, sm: 1 },
        backgroundColor: 'background.paper',
        p: 2,
        borderRadius: { xs: 0, sm: 4 },
        minHeight: '100%',
        flex: location.pathname === `${RoutePath.messages}` ? '1 1 auto' : '0 0 30%',
        display: { xs: location.pathname === `${RoutePath.messages}` ? 'block' : 'none', md: 'block' },
      }}
    >
      <Typography variant="h5" sx={{ textAlign: 'center', mb: 2 }}>
        {t('messages.title')}
      </Typography>

      {!isLoadingUsers && !isLoadingChats ? (
        chats.map((chat, i) => (
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
        ))
      ) : (
        <Box sx={{ width: '100%' }}>
          <CircularProgress sx={{ display: 'block', m: 'auto' }} />
        </Box>
      )}
    </List>
  );
}
