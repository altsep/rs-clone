import { Routes, Route, useLocation } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import useSWRMutation from 'swr/mutation';
import { useEffect } from 'react';
import { darkTheme } from './themes/darkTheme';
import { lightTheme } from './themes/lightTheme';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Header from './components/Header/Header';
import Profile from './pages/Profile';
import { ApiPath, API_BASE_URL, KEY_LOCAL_STORAGE, LSKeys, RoutePath } from './constants';
import { refreshToken } from './api/usersApi';
import { ILogin } from './types/data';
import { setToken } from './utils/common';
import { setAuth, setLoading } from './store/reducers/authSlice';
import { setUser, usersLoadingSuccess } from './store/reducers/usersState';
import Messages from './pages/Messages';
import Friends from './pages/Friends';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';
import PrivateRoute from './hoc/PrivateRoute';
import usePosts from './hooks/usePosts';
import useUsers from './hooks/useUsers';
import { postsLoadingSuccess } from './store/reducers/postsState';
import NotAuthRoute from './hoc/NotAuthRoute';

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const theme = useAppSelector((state) => state.theme.mode);
  const { users, isLoading: isLoadingUsers, isValidating: isValidatingUser } = useUsers();
  const { posts, isLoading: isLoadingPosts, isValidating: isValidatingPost } = usePosts();

  const { trigger } = useSWRMutation(`${API_BASE_URL}${ApiPath.refresh}`, refreshToken);

  const checkAuth = async (): Promise<void> => {
    dispatch(setAuth(false));
    dispatch(setLoading(true));
    const res: Response | undefined = await trigger();
    if (res?.ok) {
      const resData = (await res?.json()) as ILogin;
      const { accessToken, user } = resData;
      dispatch(setAuth(true));
      setToken(accessToken);
      dispatch(setUser(user));
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (localStorage.getItem(`${LSKeys.token}_${KEY_LOCAL_STORAGE}`)) {
      checkAuth().catch((err: Error): Error => err);
    }
    localStorage.setItem(`${LSKeys.path}_${KEY_LOCAL_STORAGE}`, location.pathname);
  }, []);

  useEffect(() => {
    if (users && posts && !isLoadingPosts && !isLoadingUsers && !isValidatingPost && !isValidatingUser) {
      dispatch(usersLoadingSuccess(users));
      dispatch(postsLoadingSuccess(posts));
    }
  }, [isLoadingUsers, users, isLoadingPosts, posts, isValidatingUser, isValidatingPost, dispatch]);

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
            path={RoutePath.messages}
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
