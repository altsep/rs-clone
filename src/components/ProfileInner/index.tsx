import { Stack } from '@mui/material';
import ProfileRightColumn from '../ProfileRightColumn';
import ProfileFeed from '../ProfileFeed';
import ProfileIntro from '../ProfileIntro';

export default function ProfileInner() {
  return (
    <Stack direction="row" justifyContent="space-between" spacing={3} sx={{ borderRadius: 2, boxShadow: 1, p: 2 }}>
      <Stack flex="0 0 20%">
        <ProfileIntro />
      </Stack>
      <ProfileFeed />
      <ProfileRightColumn />
    </Stack>
  );
}
