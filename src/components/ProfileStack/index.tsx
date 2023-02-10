import { Stack } from '@mui/material';
import ProfileHeader from './ProfileHeader';
import ProfileInner from './ProfileInner';

export default function ProfileStack() {
  return (
    <Stack sx={{ direction: 'column', gap: 2, flexGrow: '1' }}>
      <ProfileHeader />
      <ProfileInner />
    </Stack>
  );
}
