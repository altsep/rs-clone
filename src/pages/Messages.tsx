import { Container, Stack } from '@mui/material';
import LeftSideBar from '../components/LeftSideBar';

export default function Messages() {
  return (
    <Container>
      <Stack direction="row" sx={{ gap: 2 }}>
        <LeftSideBar />
        <div>Message</div>
      </Stack>
    </Container>
  );
}
