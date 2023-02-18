import { ListItemAvatar, ListItemButton, Stack, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux';
import { currentLocales } from '../../../mock-data/data';
import { IChat } from '../../../types/data';
import ClickableAvatar from '../../ClickableAvatar';

interface IChatItemProps {
  chat: IChat;
}

export default function ChatItem({ chat }: IChatItemProps) {
  const navigate = useNavigate();

  const { id } = useParams();

  const { idAuthorizedUser, users } = useAppSelector((state) => state.users);

  // FIX_ME move to redux
  const idCurrentUser = +chat.userIds.filter((userId) => userId !== idAuthorizedUser).join();
  const currentUser = users.find((user) => user.id === idCurrentUser);
  const lastMessage = chat.messages[chat.messages.length - 1];

  const handleClick = () => {
    navigate(`./${idCurrentUser}`);
  };

  if (!currentUser) {
    return <div>user not found</div>;
  }
  return (
    <ListItemButton selected={id ? idCurrentUser === +id : false} onClick={handleClick} sx={{ borderRadius: 2 }}>
      <ListItemAvatar>
        <ClickableAvatar user={currentUser} />
      </ListItemAvatar>
      <Stack sx={{ width: '100%' }}>
        <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography>{currentUser.name}</Typography>
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
