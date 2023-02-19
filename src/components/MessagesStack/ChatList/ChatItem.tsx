import { ListItemAvatar, ListItemButton, Stack, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { currentLocales } from '../../../mock-data/data';
import { IChat, IUser } from '../../../types/data';
import ClickableAvatar from '../../ClickableAvatar';

interface IChatItemProps {
  chat: IChat;
  user: IUser | undefined;
}

export default function ChatItem({ chat, user }: IChatItemProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const lastMessage = chat.messages[chat.messages.length - 1];

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
      selected={location.pathname === `/messages/${user.id}`}
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
            {lastMessage
              ? new Date(lastMessage.createdAt).toLocaleString(currentLocales, {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : ''}
          </Typography>
        </Stack>
        <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography variant="caption">{lastMessage ? lastMessage.description : ''}</Typography>
        </Stack>
      </Stack>
    </ListItemButton>
  );
}
