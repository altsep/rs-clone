import { Stack } from '@mui/material';
import ProfileFriends from '../ProfileFriends';

export default function ProfileRightColumn() {
  return (
    <Stack direction="column" gap={2} flex="0 0 20%">
      <ProfileFriends />
    </Stack>
  );
}
