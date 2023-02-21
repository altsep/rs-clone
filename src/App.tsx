import { useEffect } from 'react';
import useSWRMutation from 'swr/mutation';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme } from './themes/darkTheme';
import { lightTheme } from './themes/lightTheme';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Header from './components/Header/Header';
import Profile from './pages/Profile';
import { ApiPath, API_BASE_URL, KEY_LOCAL_STORAGE, LSKeys, RoutePath } from './constants';
import { refreshToken } from './api/usersApi';
import { ILogin, TLastMessage } from './types/data';
import { getToken, setToken } from './utils/common';
import { setAuth, setAuthError, setLoading } from './store/reducers/authSlice';
import { setUser, setUsersOfExistingChats, usersLoadingSuccess } from './store/reducers/usersState';
import Messages from './pages/Messages';
import Friends from './pages/Friends';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';
import PrivateRoute from './hoc/PrivateRoute';
import usePosts from './hooks/usePosts';
import useUsers from './hooks/useUsers';
import { postsLoadingSuccess } from './store/reducers/postsState';
import useComments from './hooks/useComments';
import { commentsLoadingSuccess } from './store/reducers/commentsState';
import NotAuthRoute from './hoc/NotAuthRoute';
import useMessagesWs from './hooks/useMessagesWs';
import useUserChats from './hooks/useUserChats';
import {
  resetActiveChat,
  setChats,
  setLastMessagesInChats,
  // setNumberOfUnread,
  setNumberOfUnreadMessagesInChats,
} from './store/reducers/chatsState';

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const theme = useAppSelector((state) => state.theme.mode);
  const { idAuthorizedUser, users: usersInState } = useAppSelector((state) => state.users);
  const { chats, activeChat, numberOfUnreadMessagesInChats, lastMessagesInChats } = useAppSelector(
    (state) => state.chats
  );

  const { users, isLoadingUsers, isValidatingUsers } = useUsers();
  const { posts, isLoadingPosts, isValidatingPosts } = usePosts();
  const { comments, isLoadingComments, isValidatingComments } = useComments();
  const { userChats, isErrorUserChats } = useUserChats(idAuthorizedUser);

  const { trigger } = useSWRMutation(`${API_BASE_URL}${ApiPath.refresh}`, refreshToken);

  const checkAuth = async (): Promise<void> => {
    dispatch(setAuth(false));
    dispatch(setLoading(true));
    try {
      const res: Response | undefined = await trigger();
      if (res?.ok) {
        const resData = (await res?.json()) as ILogin;
        const { accessToken, user } = resData;
        dispatch(setAuth(true));
        setToken(accessToken);
        dispatch(setUser(user));
      } else {
        throw new Error('Authorization error. Re-login required');
      }
    } catch {
      dispatch(setAuthError(true));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    const accessToken = getToken();

    if (accessToken) {
      checkAuth().catch((err: Error): Error => err);
    }

    localStorage.setItem(`${LSKeys.path}_${KEY_LOCAL_STORAGE}`, location.pathname);
  }, []);

  useMessagesWs();

  useEffect(() => {
    if (
      users &&
      posts &&
      comments &&
      !isLoadingUsers &&
      !isLoadingPosts &&
      !isLoadingComments &&
      !isValidatingUsers &&
      !isValidatingPosts &&
      !isValidatingComments
    ) {
      dispatch(usersLoadingSuccess(users));
      dispatch(postsLoadingSuccess(posts));
      dispatch(commentsLoadingSuccess(comments));
    }
  }, [
    users,
    posts,
    comments,
    isLoadingUsers,
    isLoadingPosts,
    isLoadingComments,
    isValidatingUsers,
    isValidatingPosts,
    isValidatingComments,
    dispatch,
  ]);

  useEffect(() => {
    if (userChats && idAuthorizedUser && !isErrorUserChats) {
      dispatch(setChats(userChats));
    }
  }, [dispatch, userChats, idAuthorizedUser, isErrorUserChats]);

  useEffect(() => {
    if (chats.length > 0 && idAuthorizedUser && usersInState.length > 0) {
      dispatch(setUsersOfExistingChats(chats));
    }
  }, [dispatch, chats, idAuthorizedUser, usersInState]);

  useEffect(() => {
    if (activeChat && `${location.pathname.split('/').slice(0, 2).join('/')}` !== `${RoutePath.messages}`) {
      dispatch(resetActiveChat());
    } else if (
      activeChat &&
      `${location.pathname.split('/').slice(0, 2).join('/')}` === `${RoutePath.messages}` &&
      !location.pathname.split('/')[2]
    ) {
      dispatch(resetActiveChat());
    }
  }, [dispatch, activeChat, location]);

  useEffect(() => {
    // FIX_ME either change chats to userChats or assign chats to null first
    if (idAuthorizedUser && chats.length > 0) {
      window.addEventListener('beforeunload', () => {
        const lastMessages = chats.reduce<TLastMessage[]>((acc, chat) => {
          if (numberOfUnreadMessagesInChats && lastMessagesInChats) {
            // CHANGE_NAME
            const data = numberOfUnreadMessagesInChats.find((val) => val.chatId === chat.id);
            if (data) {
              const dataLastMessage = lastMessagesInChats.find((lastMessage) => lastMessage.chatId === data.chatId);
              if (dataLastMessage) {
                acc.push(dataLastMessage);
                return acc;
              }
            }
          }
          if (chat.messages.length > 0) {
            acc.push({
              chatId: chat.id,
              userId: +chat.userIds.filter((userId) => userId !== idAuthorizedUser).join(),
              idLastMessage: chat.messages[chat.messages.length - 1].id,
            });
          }

          return acc;
        }, []);

        localStorage.setItem(
          `${LSKeys.lastMessages}_${idAuthorizedUser}_${KEY_LOCAL_STORAGE}`,
          JSON.stringify(lastMessages)
        );
      });
    }
  }, [idAuthorizedUser, userChats, chats, numberOfUnreadMessagesInChats, lastMessagesInChats]);

  useEffect(() => {
    if (idAuthorizedUser) {
      dispatch(setLastMessagesInChats(idAuthorizedUser));
    }
  }, [dispatch, idAuthorizedUser]);

  useEffect(() => {
    if (lastMessagesInChats && chats) {
      dispatch(setNumberOfUnreadMessagesInChats(lastMessagesInChats));
    }
  }, [dispatch, lastMessagesInChats, chats]);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <CssBaseline />
      <Header />
      <Box component="main" sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <Routes>
          <Route
            path="/"
            element={
              <NotAuthRoute>
                <Login />
              </NotAuthRoute>
            }
          />
          <Route
            path={RoutePath.registration}
            element={
              <NotAuthRoute>
                <Registration />
              </NotAuthRoute>
            }
          />
          <Route
            path="/:id"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path={`${RoutePath.messages}/*`}
            element={
              <PrivateRoute>
                <Messages />
              </PrivateRoute>
            }
          />
          <Route
            path={RoutePath.friends}
            element={
              <PrivateRoute>
                <Friends />
              </PrivateRoute>
            }
          />
          <Route
            path={`${RoutePath.settings}/*`}
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
      <footer />
    </ThemeProvider>
  );
}

export default App;
