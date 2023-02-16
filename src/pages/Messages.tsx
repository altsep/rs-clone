import { Container, Stack } from '@mui/material';
import { useEffect } from 'react';
import LeftSideBar from '../components/LeftSideBar';
import MessagesStack from '../components/MessagesStack/index';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import useUserChats from '../hooks/useUserChats';
import { setChats } from '../store/reducers/chatsState';

export default function Messages() {
  const dispatch = useAppDispatch();
  const { idAuthorizedUser } = useAppSelector((state) => state.users);

  const { userChats } = useUserChats(idAuthorizedUser);

  useEffect(() => {
    if (userChats) {
      dispatch(setChats(userChats));
    }
  }, [dispatch, userChats]);

  return (
    <Container sx={{ mt: '5vh', mb: '5vh', display: 'flex' }}>
      <Stack direction="row" sx={{ gap: 2, minWidth: '100%' }}>
        <LeftSideBar />
        <MessagesStack />
      </Stack>
    </Container>
  );
}
