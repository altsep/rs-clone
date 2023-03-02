import { Container, Stack } from '@mui/material';
import LeftSideBar from '../components/LeftSideBar';
import MessagesStack from '../components/MessagesStack';

export default function Messages() {
  return (
    <Container sx={{ mt: '5vh', mb: '5vh', display: 'flex' }}>
      <Stack direction="row" sx={{ gap: 2, minWidth: '100%' }}>
        <LeftSideBar />
        <MessagesStack />
      </Stack>
    </Container>
  );
}
