import { Container, Stack } from '@mui/material';
import LeftSideBar from '../components/LeftSideBar';

export default function Friends() {
  return (
    <Container>
      <Stack direction="row" sx={{ gap: 2 }}>
        <LeftSideBar />
        <div>Settings</div>
      </Stack>
    </Container>
  );
}
