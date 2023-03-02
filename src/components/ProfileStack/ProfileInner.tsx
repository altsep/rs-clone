import { Stack } from '@mui/material';
import ProfileRightColumn from './ProfileRightColumn';
import ProfileFeed from './ProfileFeed';
import ProfileIntro from './ProfileIntro';
import { useAppSelector } from '../../hooks/redux';
import ProfileHidden from './ProfileHidden';

export default function ProfileInner() {
  const currentUser = useAppSelector((state) => state.users.currentProfile);
  const authorizedUser = useAppSelector((state) => state.users.authorizedUser);

  if (currentUser?.hidden && currentUser?.id !== authorizedUser?.id) {
    return <ProfileHidden />;
  }

  return (
    <Stack
      sx={{
        borderRadius: 4,
        boxShadow: { xs: 0, md: 4 },
        bgcolor: { xs: 'none', md: 'secondary.main' },
        p: { xs: 0, md: 2 },
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        gap: 2,
        minHeight: '500px',
        backgroundColor: { xs: 'secondary.main', sm: 'transparent' },
      }}
    >
      <Stack sx={{ flexGrow: '1' }}>
        <ProfileIntro />
      </Stack>
      <ProfileFeed />
      <ProfileRightColumn />
    </Stack>
  );
}
