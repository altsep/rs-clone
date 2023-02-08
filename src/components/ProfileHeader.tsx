import useSWRMutation from 'swr/mutation';
import { Box, Button, Typography, Badge, Avatar, IconButton } from '@mui/material';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import useUser from '../hooks/useUser';
import { idAuthorizedUser } from '../mock-data/data';
import { ApiPath, API_BASE_URL } from '../constants';
import { updateUser } from '../api/usersApi';
import { UpdateUserArg } from '../types/usersApi';
import useParamsIdCurrentProfile from '../hooks/useParamsIdCurrentProfile';

export default function ProfileHeader() {
  const { idCurrentProfile } = useParamsIdCurrentProfile();

  const { user: userCurrentProfile, isLoading: isLoadingUserCurrentProfile } = useUser(idCurrentProfile);
  const { user: currentAuthorizedUser } = useUser(idAuthorizedUser);
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

    if (userCurrentProfile && currentAuthorizedUser) {
      const argUpdateCurrentAuthorizedUser: UpdateUserArg = {
        friendsIds: currentAuthorizedUser.friendsIds
          ? [...currentAuthorizedUser.friendsIds, idCurrentProfile]
          : [idCurrentProfile],
      };
      await triggerUpdateCurrentAuthorizedUser(argUpdateCurrentAuthorizedUser);
      const argUpdateCurrentProfileUser: UpdateUserArg = {
        friendsIds: userCurrentProfile.friendsIds
          ? [...userCurrentProfile.friendsIds, idAuthorizedUser]
          : [idAuthorizedUser],
      };
      await triggerUpdateCurrentProfileUser(argUpdateCurrentProfileUser);
    }
  };

  return (
    <Box sx={{ borderRadius: 2, boxShadow: 1 }}>
      <Box
        component="img"
        src="https://wallpaperaccess.com/full/106956.jpg"
        alt="Background image"
        sx={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: 2 }}
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
            }}
          >
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
                src={userCurrentProfile && userCurrentProfile.avatarURL}
                alt="Avatar"
                sx={{ width: 150, height: 150, border: 3, borderColor: 'common.white' }}
              />
            </Badge>
            {idCurrentProfile === idAuthorizedUser && (
              <Button variant="contained" startIcon={<CloudDownloadOutlinedIcon />}>
                Edit Cover Photo
              </Button>
            )}
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2, pb: 3, pt: 5, minHeight: '36.5px' }}>
        <Typography variant="h5">{userCurrentProfile && userCurrentProfile.name}</Typography>

        {idCurrentProfile === idAuthorizedUser ? (
          <Button>Edit basic info</Button>
        ) : (
          <Box>
            {(userCurrentProfile &&
              userCurrentProfile.friendsIds &&
              userCurrentProfile.friendsIds.includes(idAuthorizedUser) && (
                <Button onClick={handleClickRemoveFriend}>Remove friend</Button>
              )) ||
              (!isLoadingUserCurrentProfile ? <Button onClick={handleClickAddFriend}>Add friend</Button> : <Button />)}
          </Box>
        )}
      </Box>
    </Box>
  );
}
