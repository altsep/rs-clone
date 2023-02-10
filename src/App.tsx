import { useEffect } from 'react';
import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Profile from './pages/Profile';
import { RoutePath } from './constants';
import Friends from './pages/Friends';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import TemporaryHeader from './components/TemporaryHeader';
import useUsers from './hooks/useUsers';
import { useAppDispatch } from './hooks/redux';
import { usersLoadingSuccess } from './store/reducers/usersState';
import usePosts from './hooks/usePosts';
import { postsLoadingSuccess } from './store/reducers/postsState';
import NotFound from './pages/NotFound';

function App() {
  const dispatch = useAppDispatch();

  const { users, isLoading: isLoadingUsers, isValidating: isValidatingUser } = useUsers();
  const { posts, isLoading: isLoadingPosts, isValidating: isValidatingPost } = usePosts();

  useEffect(() => {
    if (users && posts && !isLoadingPosts && !isLoadingUsers && !isValidatingPost && !isValidatingUser) {
      dispatch(usersLoadingSuccess(users));
      dispatch(postsLoadingSuccess(posts));
    }
  }, [isLoadingUsers, users, isLoadingPosts, posts, isValidatingUser, isValidatingPost, dispatch]);

  return (
    <>
      <CssBaseline />
      <TemporaryHeader />
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path={RoutePath.registration} element={<Registration />} />
          <Route path="/:id" element={<Profile />} />
          <Route path={RoutePath.messages} element={<Messages />} />
          <Route path={RoutePath.friends} element={<Friends />} />
          <Route path={RoutePath.settings} element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer />
    </>
  );
}

export default App;
