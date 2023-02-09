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
import { usersLoadingSuccess } from './store/reducers/userState';

function App() {
  const dispatch = useAppDispatch();
  const { users, isLoading } = useUsers();

  useEffect(() => {
    if (!isLoading && users) {
      dispatch(usersLoadingSuccess(users));
    }
  }, [isLoading, users, dispatch]);

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
        </Routes>
      </main>
      <footer />
    </>
  );
}

export default App;
