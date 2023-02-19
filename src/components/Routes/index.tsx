import { Routes as RoutesContainer, Route } from 'react-router-dom';
import Login from '../../pages/Login';
import Registration from '../../pages/Registration';
import Profile from '../../pages/Profile';
import { RoutePath } from '../../constants';
import Messages from '../../pages/Messages';
import Friends from '../../pages/Friends';
import NotFound from '../../pages/NotFound';
import Settings from '../../pages/Settings';
import PrivateRoute from '../../hoc/PrivateRoute';
import NotAuthRoute from '../../hoc/NotAuthRoute';

export default function Routes() {
  return (
    <RoutesContainer>
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
    </RoutesContainer>
  );
}
