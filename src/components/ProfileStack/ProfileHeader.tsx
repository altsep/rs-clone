import useSWRMutation from 'swr/mutation';
import { Box, Button, Typography, Badge, Avatar, IconButton, Skeleton } from '@mui/material';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import { ApiPath, API_BASE_URL } from '../../constants';
import { updateUser } from '../../api/usersApi';
import { UpdateUserArg } from '../../types/usersApi';
import temporary from '../../assets/temporary-2.webp';
import { useAppSelector } from '../../hooks/redux';

export default function ProfileHeader() {
  const { idCurrentProfile, idAuthorizedUser, currentProfile, authorizedUser, defineUserCompleted } = useAppSelector(
    (state) => state.users
  );

  const { trigger: triggerUpdateCurrentAuthorizedUser } = useSWRMutation(
    `${API_BASE_URL}${ApiPath.users}/${idAuthorizedUser}`,
    updateUser
  );
  const { trigger: triggerUpdateCurrentProfileUser } = useSWRMutation(
    `${API_BASE_URL}${ApiPath.users}/${idCurrentProfile}`,
    updateUser
  );

  const handleClickRemoveFriend = async (): Promise<void> => {};

  const handleClickAddFriend = async (): Promise<void> => {
    // FIX_ME Friends must be added after confirmation

    if (currentProfile && authorizedUser) {
      const argUpdateCurrentAuthorizedUser: UpdateUserArg = {
        friendsIds: authorizedUser.friendsIds ? [...authorizedUser.friendsIds, idCurrentProfile] : [idCurrentProfile],
      };
      await triggerUpdateCurrentAuthorizedUser(argUpdateCurrentAuthorizedUser);
      const argUpdateCurrentProfileUser: UpdateUserArg = {
        friendsIds: authorizedUser.friendsIds ? [...authorizedUser.friendsIds, idAuthorizedUser] : [idAuthorizedUser],
      };
      await triggerUpdateCurrentProfileUser(argUpdateCurrentProfileUser);
    }
  };

  return (
    <Box sx={{ borderRadius: 2, boxShadow: 1 }}>
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
              <Button variant="contained" startIcon={<CloudDownloadOutlinedIcon />}>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>Edit Cover</Box>
              </Button>
            )}
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2, pb: 3, pt: 5, minHeight: '36.5px' }}>
        <Typography variant="h5">{currentProfile && currentProfile.name}</Typography>

        {idCurrentProfile === idAuthorizedUser ? (
          <Button disabled={!defineUserCompleted}>Edit basic info</Button>
        ) : (
          <Box>
            {(currentProfile && currentProfile.friendsIds && currentProfile.friendsIds.includes(idAuthorizedUser) && (
              <Button onClick={handleClickRemoveFriend}>Remove friend</Button>
            )) ||
              (defineUserCompleted ? <Button onClick={handleClickAddFriend}>Add friend</Button> : <Button />)}
          </Box>
        )}
      </Box>
    </Box>
  );
}
