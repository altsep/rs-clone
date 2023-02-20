import { Box, ListItemAvatar, ListItemButton, Stack, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { RoutePath } from '../../../constants';
import { currentLocales } from '../../../mock-data/data';
import { IChat, IUser } from '../../../types/data';
import { TNumberOfNewMessagesInChat } from '../../../types/state';
import ClickableAvatar from '../../ClickableAvatar';

interface IChatItemProps {
  chat: IChat;
  user: IUser | undefined;
  // CHANGE_NAME
  numberOfNewMessagesInChat: TNumberOfNewMessagesInChat | undefined;
}

export default function ChatItem({ chat, user, numberOfNewMessagesInChat }: IChatItemProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (user) {
      navigate(`./${user.id}`);
    }
  };

  if (!user) {
    return <ListItemButton>User is not found</ListItemButton>;
  }
  return (
    <ListItemButton
      selected={location.pathname === `${RoutePath.messages}/${user.id}`}
      onClick={handleClick}
      sx={{ borderRadius: 2 }}
    >
      <ListItemAvatar>
        <ClickableAvatar user={user} />
      </ListItemAvatar>
      <Stack sx={{ width: '100%' }}>
        <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography>{user.name}</Typography>
          <Typography variant="caption">
            {chat.messages[chat.messages.length - 1] &&
              new Date(chat.messages[chat.messages.length - 1].createdAt).toLocaleString(currentLocales, {
                hour: '2-digit',
                minute: '2-digit',
              })}
          </Typography>
        </Stack>
        <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              maxWidth: location.pathname === `${RoutePath.messages}` ? 'calc(100%)' : '100px',
            }}
          >
            {chat.messages[chat.messages.length - 1] && chat.messages[chat.messages.length - 1].description}
          </Typography>
          {numberOfNewMessagesInChat && <Box>{numberOfNewMessagesInChat.counter}</Box>}
        </Stack>
      </Stack>
    </ListItemButton>
  );
}
