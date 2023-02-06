import { Stack, Container } from '@mui/material';
import ProfileHeader from '../components/ProfileHeader';
import ProfileInner from '../components/ProfileInner';

export default function Profile() {
  return (
    <Container>
      <Stack direction="column" gap={2}>
        <ProfileHeader />
        <ProfileInner />
      </Stack>
    </Container>
  );
}
