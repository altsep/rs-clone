import { Stack } from '@mui/material';
import ProfileFriends from './ProfileFriends';

export default function ProfileRightColumn() {
  return (
    <Stack sx={{ flexDirection: 'column', gap: 2, flex: { xs: 0, md: '0 0 26%' }, order: { xs: 2, md: 3 } }}>
      <ProfileFriends />
    </Stack>
  );
}
