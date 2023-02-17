import useSWRMutation from 'swr/mutation';
import { useCallback, useEffect } from 'react';
import { Container, Stack } from '@mui/material';
import LeftSideBar from '../components/LeftSideBar';
import MessagesStack from '../components/MessagesStack/index';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import useUserChats from '../hooks/useUserChats';
import { setChats, setUsersIdsOfExistingChats } from '../store/reducers/chatsState';
import { addChat } from '../api/chatsApi';
import { ApiPath, API_BASE_URL } from '../constants';

export default function Messages() {
  const dispatch = useAppDispatch();
  const { idAuthorizedUser } = useAppSelector((state) => state.users);

  const { userChats, isError } = useUserChats(idAuthorizedUser);

  useEffect(() => {
    if (userChats && idAuthorizedUser && !isError) {
      dispatch(setChats(userChats));
      dispatch(setUsersIdsOfExistingChats(idAuthorizedUser));
    }
  }, [dispatch, userChats, idAuthorizedUser, isError]);

  // const fetchAddChat = useCallback(async () => {
  //   if (!usersIdsOfExistingChats.includes(userIdForWritingMessage)) {
  //     const argAddChat = { userIds: [idAuthorizedUser, userIdForWritingMessage] };
  //     await triggerAddChat(argAddChat);
  //   }
  // }, [idAuthorizedUser, userIdForWritingMessage, triggerAddChat, usersIdsOfExistingChats]);

  // useEffect(() => {
  //   if (userIdForWritingMessage !== 0) {
  //     fetchAddChat().catch((err) => console.error(err));
  //   }
  // }, [userIdForWritingMessage, fetchAddChat]);

  return (
    <Container sx={{ mt: '5vh', mb: '5vh', display: 'flex' }}>
      <Stack direction="row" sx={{ gap: 2, minWidth: '100%' }}>
        <LeftSideBar />
        <MessagesStack />
      </Stack>
    </Container>
  );
}
