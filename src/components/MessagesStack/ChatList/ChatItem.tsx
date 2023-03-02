import { Divider, ListItemAvatar, ListItemButton, Stack, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { INIT_MESSAGE, RoutePath } from '../../../constants';
import { useAppSelector } from '../../../hooks/redux';
import { IChat, IUser } from '../../../types/data';
import ClickableAvatar from '../../ClickableAvatar';
import NotificationCounter from '../../NotificationCounter';

interface IChatItemProps {
  chat: IChat;
  user: IUser | undefined;
  numberOfUnreadMessages: number | null | undefined;
}

export default function ChatItem({ chat, user, numberOfUnreadMessages }: IChatItemProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const currentLocale = useAppSelector((state) => state.language.lang);

  const handleClick = () => {
    if (user) {
      navigate(`./${user.id}`);
    }
  };

  if (!user) {
    return null;
  }
  return (
    <>
      <ListItemButton
        selected={location.pathname === `${RoutePath.messages}/${user.id}`}
        onClick={handleClick}
        sx={{ alignItems: 'flex-start' }}
      >
        <ListItemAvatar>
          <ClickableAvatar user={user} />
        </ListItemAvatar>
        <Stack sx={{ width: '100%' }}>
          <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', gap: 1 }}>
            <Typography
              sx={{
                display: 'block',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                wordBreak: 'break-all',
                whiteSpace: location.pathname === `${RoutePath.messages}` ? 'break-spaces' : 'nowrap',
                maxWidth: location.pathname === `${RoutePath.messages}` ? 'calc(87%)' : '100px',
              }}
            >
              {user.name}
            </Typography>
            <Typography variant="caption" sx={{ flexShrink: 0 }}>
              {chat.messages[chat.messages.length - 1] &&
                chat.messages[chat.messages.length - 1].description !== INIT_MESSAGE &&
                new Date(chat.messages[chat.messages.length - 1].createdAt).toLocaleString(currentLocale, {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
            </Typography>
          </Stack>
          <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography
              variant="caption"
              sx={{
                maxHeight: '100px',
                display: 'block',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                wordBreak: 'break-all',
                whiteSpace: location.pathname === `${RoutePath.messages}` ? 'break-spaces' : 'nowrap',
                maxWidth: location.pathname === `${RoutePath.messages}` ? 'calc(87%)' : '100px',
              }}
            >
              {chat.messages[chat.messages.length - 1] &&
                chat.messages[chat.messages.length - 1].description !== INIT_MESSAGE &&
                chat.messages[chat.messages.length - 1].description}
            </Typography>

            {!!numberOfUnreadMessages && <NotificationCounter counter={numberOfUnreadMessages} />}
          </Stack>
        </Stack>
      </ListItemButton>
      <Divider />
    </>
  );
}
