import useSWRMutation from 'swr/mutation';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardActionArea, CardActions, CardHeader, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { IUser } from '../../types/data';
import ClickableAvatar from '../ClickableAvatar';
import { ApiPath, API_BASE_URL, INIT_MESSAGE, RoutePath } from '../../constants';
import { updateUser } from '../../api/usersApi';
import { TUpdateUserArg } from '../../types/usersApi';
import { updateUserInState } from '../../store/reducers/usersState';
import { addChat } from '../../api/chatsApi';
import { addChatInState } from '../../store/reducers/chatsState';
import { isChat } from '../../types/predicates';

interface IFriendCardProps {
  user: IUser;
  isRequest: boolean;
}

export default function FriendCard({ user, isRequest }: IFriendCardProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { idAuthorizedUser, authorizedUser, usersOfExistingChats, messagesWs } = useAppSelector((state) => state.users);

  const { trigger: triggerUpdateAuthorizedUser } = useSWRMutation(
    `${API_BASE_URL}${ApiPath.users}/${idAuthorizedUser}`,
    updateUser
  );
  const { trigger: triggerUpdateCurrentProfileUser } = useSWRMutation(
    `${API_BASE_URL}${ApiPath.users}/${user.id}`,
    updateUser
  );
  const { trigger: triggerAddChat } = useSWRMutation(`${API_BASE_URL}${ApiPath.chats}`, addChat);

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

  const handleClickRemoveFriend = async (): Promise<void> => {
    if (authorizedUser) {
      const argUpdateCurrentProfileUser: TUpdateUserArg = {
        friendsIds: user.friendsIds ? user.friendsIds.filter((friendId) => friendId !== idAuthorizedUser) : [],
      };
      const dataResponseCurrentProfile = await triggerUpdateCurrentProfileUser(argUpdateCurrentProfileUser);
      if (dataResponseCurrentProfile) {
        dispatch(updateUserInState(dataResponseCurrentProfile));
      }
      const argUpdateAuthorizedUser: TUpdateUserArg = {
        friendsIds: authorizedUser.friendsIds
          ? authorizedUser.friendsIds.filter((friendId) => friendId !== user.id)
          : [],
      };
      const dataResponseAuthorized = await triggerUpdateAuthorizedUser(argUpdateAuthorizedUser);
      if (dataResponseAuthorized) {
        dispatch(updateUserInState(dataResponseAuthorized));
      }
    }
  };

  const handleClickActionArea = (): void => {
    if (user.alias) {
      navigate(`/${user.alias}`);
    } else {
      navigate(`/id${user.id}`);
    }
  };

  const handleClickWriteMessage = async () => {
    if (
      !usersOfExistingChats.find((userOfExistingChats) => userOfExistingChats && userOfExistingChats.id === user.id)
    ) {
      const argAddChat = { userIds: [idAuthorizedUser, user.id] };
      const dataResponse = await triggerAddChat(argAddChat);
      if (isChat(dataResponse)) {
        dispatch(addChatInState(dataResponse));
        const msg = {
          type: 'send',
          payload: { chatId: dataResponse.id, userId: idAuthorizedUser, description: INIT_MESSAGE },
        };
        messagesWs?.send(JSON.stringify(msg));
      }
    }
    navigate(`${RoutePath.messages}/${user.id}`);
  };

  return (
    <Grid item xs={12 / 1} md={12 / 3} sx={{ minHeight: '100%' }}>
      <Card
        sx={{
          p: 1,
          borderRadius: { xs: 0, sm: 4 },
          minHeight: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <CardActionArea onClick={handleClickActionArea}>
          <CardHeader
            avatar={<ClickableAvatar user={user} width="50px" height="50px" />}
            title={user.name}
            subheader={idAuthorizedUser !== user.id && user.hidden ? `${t('profile.hiddenInfo')}` : user.country}
            sx={{ wordWrap: 'break-word', wordBreak: 'break-word' }}
          />
        </CardActionArea>

        <CardActions sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {isRequest ? (
            <>
              <Button variant="outlined" onClick={handleClickIgnore} sx={{ flexGrow: 1 }}>
                {t('friends.friendCard.ignore')}
              </Button>
              <Button variant="contained" onClick={handleClickFollow} sx={{ flexGrow: 1, ml: '0!important' }}>
                {t('friends.friendCard.accept')}
              </Button>
            </>
          ) : (
            <>
              <Button variant="contained" onClick={handleClickWriteMessage} sx={{ flexGrow: 1 }}>
                {t('friends.friendCard.message')}
              </Button>
              <Button variant="outlined" onClick={handleClickRemoveFriend} sx={{ flexGrow: 1, ml: '0!important' }}>
                {t('friends.friendCard.remove')}
              </Button>
            </>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}
