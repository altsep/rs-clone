import { useEffect } from 'react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme } from './themes/darkTheme';
import { lightTheme } from './themes/lightTheme';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import Header from './components/Header/Header';
import { usersLoadingSuccess } from './store/reducers/usersState';
import usePosts from './hooks/usePosts';
import useUsers from './hooks/useUsers';
import { postsLoadingSuccess } from './store/reducers/postsState';
import useComments from './hooks/useComments';
import { commentsLoadingSuccess } from './store/reducers/commentsState';
import Footer from './components/Footer/Footer';
import useMessagesWs from './hooks/useMessagesWs';
import Routes from './components/Routes';
import useAuth from './hooks/useAuth';

function App() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.mode);

  const { users, isLoadingUsers, isValidatingUsers } = useUsers();
  const { posts, isLoadingPosts, isValidatingPosts } = usePosts();
  const { comments, isLoadingComments, isValidatingComments } = useComments();

  useAuth();

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

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <CssBaseline />
      <Header />
      <Box component="main" sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <Routes />
      </Box>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
