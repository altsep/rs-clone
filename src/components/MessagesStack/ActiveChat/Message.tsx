import { Box, ListItem, Stack } from '@mui/material';
import { useAppSelector } from '../../../hooks/redux';
import ClickableAvatar from '../../ClickableAvatar';

interface IMessageProps {
  message: string;
  isLeft: boolean;
}

export default function Message({ message, isLeft }: IMessageProps) {
  // FIX_ME Delete after adding real data
  const { authorizedUser } = useAppSelector((state) => state.users);

  if (!authorizedUser) {
    return <div>error</div>;
  }

  const mockTime = '11:26 am';
  //

  if (!isLeft) {
    return (
      <ListItem sx={{ flexDirection: 'column' }}>
        <Stack sx={{ flexDirection: 'row', alignItems: 'end', gap: 2, width: '100%' }}>
          <Box sx={{ flexGrow: 1, bgcolor: 'secondary.main', p: 2, borderRadius: 2 }}>{message}</Box>
          <ClickableAvatar user={authorizedUser} />
        </Stack>
        <Stack sx={{ flexDirection: 'row', width: '100%' }}>
          <Box sx={{ mr: 'auto' }}>{mockTime}</Box>
        </Stack>
      </ListItem>
    );
  }

  return (
    <ListItem sx={{ flexDirection: 'column' }}>
      <Stack sx={{ flexDirection: 'row', alignItems: 'end', gap: 2, width: '100%' }}>
        <ClickableAvatar user={authorizedUser} />
        <Box sx={{ flexGrow: 1, bgcolor: 'primary.main', p: 2, borderRadius: 2 }}>{message}</Box>
      </Stack>
      <Stack sx={{ flexDirection: 'row', width: '100%' }}>
        <Box sx={{ ml: 'auto' }}>{mockTime}</Box>
      </Stack>
    </ListItem>
  );
}
