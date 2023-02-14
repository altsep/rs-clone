import useSWRMutation from 'swr/mutation';
import { Box, Button, Typography, Badge, Avatar, IconButton, Skeleton } from '@mui/material';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import { ApiPath, API_BASE_URL } from '../../constants';
import { updateUser } from '../../api/usersApi';
import { TUpdateUserArg } from '../../types/usersApi';
import temporary from '../../assets/temporary-2.webp';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateUserInState } from '../../store/reducers/usersState';

export default function ProfileHeader() {
  const dispatch = useAppDispatch();
  const { idCurrentProfile, idAuthorizedUser, currentProfile, authorizedUser } = useAppSelector((state) => state.users);

  const { trigger: triggerUpdateAuthorizedUser } = useSWRMutation(
    `${API_BASE_URL}${ApiPath.users}/${idAuthorizedUser}`,
    updateUser
  );
  const { trigger: triggerUpdateCurrentProfileUser } = useSWRMutation(
    `${API_BASE_URL}${ApiPath.users}/${idCurrentProfile}`,
    updateUser
  );

  const handleClickAddFriend = async (): Promise<void> => {
    if (currentProfile) {
      const argUpdateCurrentProfileUser: TUpdateUserArg = {
        pendingFriendsIds: currentProfile.pendingFriendsIds
          ? [...currentProfile.pendingFriendsIds, idAuthorizedUser]
          : [idAuthorizedUser],
      };
      const dataResponse = await triggerUpdateCurrentProfileUser(argUpdateCurrentProfileUser);
      if (dataResponse) {
        dispatch(updateUserInState(dataResponse));
      }
    }
  };

  const handleClickFollow = async () => {
    if (authorizedUser) {
      const argUpdateAuthorizedUser: TUpdateUserArg = {
        friendsIds: authorizedUser.friendsIds ? [...authorizedUser.friendsIds, idCurrentProfile] : [idCurrentProfile],
        pendingFriendsIds: authorizedUser.pendingFriendsIds
          ? authorizedUser.pendingFriendsIds.filter((pendingFriendId) => pendingFriendId !== idCurrentProfile)
          : [],
      };
      const dataResponseAuthorized = await triggerUpdateAuthorizedUser(argUpdateAuthorizedUser);
      const argUpdateCurrentProfileUser: TUpdateUserArg = {
        friendsIds: currentProfile?.friendsIds ? [...currentProfile.friendsIds, idAuthorizedUser] : [idAuthorizedUser],
      };
      const dataResponseCurrentProfile = await triggerUpdateCurrentProfileUser(argUpdateCurrentProfileUser);
      if (dataResponseAuthorized && dataResponseCurrentProfile) {
        dispatch(updateUserInState(dataResponseAuthorized));
        dispatch(updateUserInState(dataResponseCurrentProfile));
      }
    }
  };

  return (
    <Box sx={{ borderRadius: 4, boxShadow: 4 }}>
      <Box
        component="img"
        src={temporary}
        alt="Background image"
        sx={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: 2 }}
      />
      <Box sx={{ px: 2 }}>
        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'absolute',
              bottom: -20,
              left: 0,
              width: '100%',
              gap: 1,
            }}
          >
            {currentProfile ? (
              <Badge
                overlap="circular"
                badgeContent={
                  <IconButton sx={{ background: 'white', p: 0.5, borderRadius: '50%', minWidth: '0' }}>
                    <input hidden accept="image/*" type="file" />
                    <CloudDownloadOutlinedIcon />
                  </IconButton>
                }
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              >
                <Avatar
                  src={currentProfile.avatarURL}
                  alt="Avatar"
                  sx={{ width: 150, height: 150, border: 3, borderColor: 'common.white' }}
                />
              </Badge>
            ) : (
              <Skeleton variant="circular">
                <Avatar sx={{ width: 150, height: 150 }} />
              </Skeleton>
            )}
            {idCurrentProfile === idAuthorizedUser && (
              <Button variant="contained" sx={{ gap: 1 }}>
                <CloudDownloadOutlinedIcon />
                <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>Edit Cover</Typography>
              </Button>
            )}
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2, pb: 3, pt: 5, minHeight: '36.5px' }}>
        <Typography variant="h5">{currentProfile && currentProfile.name}</Typography>

        {idCurrentProfile === idAuthorizedUser && (
          <Button variant="outlined" sx={{ background: 'secondary.main' }}>
            Edit basic info
          </Button>
        )}
        {idCurrentProfile !== idAuthorizedUser && (
          <Box>
            {(authorizedUser?.pendingFriendsIds?.includes(idCurrentProfile) && (
              <Button variant="outlined" onClick={handleClickFollow}>
                Accept friend request
              </Button>
            )) ||
              (currentProfile?.friendsIds?.includes(idAuthorizedUser) && (
                <Button variant="contained" sx={{ flexGrow: 1 }}>
                  Write message
                </Button>
              )) ||
              (currentProfile?.pendingFriendsIds?.includes(idAuthorizedUser) && (
                <Button variant="outlined" disabled>
                  Friend request sent
                </Button>
              )) || (
                <Button variant="outlined" onClick={handleClickAddFriend}>
                  Add friend
                </Button>
              )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
