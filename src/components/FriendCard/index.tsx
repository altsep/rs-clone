import useSWRMutation from 'swr/mutation';
import { Button, Card, CardActions, CardHeader, Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { IUser } from '../../types/data';
import ClickableAvatar from '../ClickableAvatar';
import { ApiPath, API_BASE_URL } from '../../constants';
import { updateUser } from '../../api/usersApi';
import { TUpdateUserArg } from '../../types/usersApi';
import { updateUserInState } from '../../store/reducers/usersState';

interface IFriendCardProps {
  user: IUser;
  isRequest: boolean;
}

export default function FriendCard({ user, isRequest }: IFriendCardProps) {
  const dispatch = useAppDispatch();
  const { idAuthorizedUser, authorizedUser } = useAppSelector((state) => state.users);
  const { trigger: triggerUpdateAuthorizedUser } = useSWRMutation(
    `${API_BASE_URL}${ApiPath.users}/${idAuthorizedUser}`,
    updateUser
  );
  const { trigger: triggerUpdateCurrentProfileUser } = useSWRMutation(
    `${API_BASE_URL}${ApiPath.users}/${user.id}`,
    updateUser
  );

  const handleClickIgnore = async () => {
    if (authorizedUser) {
      const argUpdateAuthorizedUser: TUpdateUserArg = {
        pendingFriendsIds: authorizedUser.pendingFriendsIds
          ? authorizedUser.pendingFriendsIds.filter((pendingFriendId) => pendingFriendId !== user.id)
          : [],
      };
      const dataResponse = await triggerUpdateAuthorizedUser(argUpdateAuthorizedUser);
      if (dataResponse) {
        dispatch(updateUserInState(dataResponse));
      }
    }
  };

  const handleClickFollow = async () => {
    if (authorizedUser) {
      const argUpdateAuthorizedUser: TUpdateUserArg = {
        friendsIds: authorizedUser.friendsIds ? [...authorizedUser.friendsIds, user.id] : [user.id],
        pendingFriendsIds: authorizedUser.pendingFriendsIds
          ? authorizedUser.pendingFriendsIds.filter((pendingFriendId) => pendingFriendId !== user.id)
          : [],
      };
      const dataResponseAuthorized = await triggerUpdateAuthorizedUser(argUpdateAuthorizedUser);
      const argUpdateCurrentProfileUser: TUpdateUserArg = {
        friendsIds: user.friendsIds ? [...user.friendsIds, idAuthorizedUser] : [idAuthorizedUser],
      };
      const dataResponseCurrentProfile = await triggerUpdateCurrentProfileUser(argUpdateCurrentProfileUser);
      if (dataResponseAuthorized && dataResponseCurrentProfile) {
        dispatch(updateUserInState(dataResponseAuthorized));
        dispatch(updateUserInState(dataResponseCurrentProfile));
      }
    }
  };

  return (
    <Grid item>
      <Card>
        <CardHeader avatar={<ClickableAvatar user={user} />} title={user.name} subheader={user.alias} />
        {isRequest && (
          <CardActions>
            <Button onClick={handleClickIgnore}>Ignore</Button>
            <Button variant="contained" onClick={handleClickFollow}>
              Follow
            </Button>
          </CardActions>
        )}
      </Card>
    </Grid>
  );
}
