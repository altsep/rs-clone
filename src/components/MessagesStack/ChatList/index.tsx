import { List, ListItemAvatar, ListItemButton, Stack, Typography } from '@mui/material';
import { useAppSelector } from '../../../hooks/redux';
import ClickableAvatar from '../../ClickableAvatar';

export default function ChatList() {
  // FIX_ME Delete after adding real data
  const { authorizedUser } = useAppSelector((state) => state.users);

  if (!authorizedUser) {
    return <div>error</div>;
  }
  const mockMessage = 'Thanks buddy, you to have';
  const mockTime = '11:26 am';
  //
  return (
    <List sx={{ background: 'white', p: 2, borderRadius: 4, minHeight: '100%' }}>
      <ListItemButton selected sx={{ borderRadius: 2 }}>
        <ListItemAvatar>
          <ClickableAvatar user={authorizedUser} />
        </ListItemAvatar>
        <Stack sx={{ width: '100%' }}>
          <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography>{authorizedUser.name}</Typography>
            <Typography variant="caption">{mockTime}</Typography>
          </Stack>
          <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography variant="caption">{mockMessage}</Typography>
          </Stack>
        </Stack>
      </ListItemButton>

      <ListItemButton sx={{ borderRadius: 2 }}>
        <ListItemAvatar>
          <ClickableAvatar user={authorizedUser} />
        </ListItemAvatar>
        <Stack sx={{ width: '100%' }}>
          <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography>{authorizedUser.name}</Typography>
            <Typography variant="caption">{mockTime}</Typography>
          </Stack>
          <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography variant="caption">{mockMessage}</Typography>
          </Stack>
        </Stack>
      </ListItemButton>
    </List>
  );
}
