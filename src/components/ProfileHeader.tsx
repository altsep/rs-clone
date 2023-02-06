import { useParams } from 'react-router-dom';
import useSWRMutation from 'swr/mutation';
import { Box, Button, Typography, Badge, Avatar, IconButton, Skeleton } from '@mui/material';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import useUser from '../hooks/useUser';
import { idCurrentAuthorizedUser } from '../mock-data/data';
import { ApiPath, API_BASE_URL } from '../constants';
import { updateUser } from '../api/usersApi';
import { UpdateUserArg } from '../types/usersApi';

export default function ProfileHeader() {
  const { id: idCurrentProfileString } = useParams();

  const { user: userCurrentProfile, isLoading: isLoadingUserCurrentProfile } = useUser(Number(idCurrentProfileString));
  const { user: currentAuthorizedUser } = useUser(idCurrentAuthorizedUser);

  const { trigger: triggerUpdateCurrentAuthorizedUser } = useSWRMutation(
    `${API_BASE_URL}${ApiPath.users}/${idCurrentAuthorizedUser}`,
    updateUser
  );

  const { trigger: triggerUpdateCurrentProfileUser } = useSWRMutation(
    `${API_BASE_URL}${ApiPath.users}/${Number(idCurrentProfileString)}`,
    updateUser
  );

  const handleClickRemoveFriend = async (): Promise<void> => {};

  const handleClickAddFriend = async (): Promise<void> => {
    // FIX_ME Friends must be added after confirmation
    try {
      if (userCurrentProfile && currentAuthorizedUser) {
        const argUpdateCurrentAuthorizedUser: UpdateUserArg = {
          friendsIds: currentAuthorizedUser.friendsIds
            ? [...currentAuthorizedUser.friendsIds, Number(idCurrentProfileString)]
            : [Number(idCurrentProfileString)],
        };
        await triggerUpdateCurrentAuthorizedUser(argUpdateCurrentAuthorizedUser);
        const argUpdateCurrentProfileUser: UpdateUserArg = {
          friendsIds: userCurrentProfile.friendsIds
            ? [...userCurrentProfile.friendsIds, idCurrentAuthorizedUser]
            : [idCurrentAuthorizedUser],
        };
        await triggerUpdateCurrentProfileUser(argUpdateCurrentProfileUser);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ borderRadius: 2, boxShadow: 1 }}>
      <Box sx={{ position: 'relative' }}>
        <Box
          component="img"
          src="https://wallpaperaccess.com/full/106956.jpg"
          alt="Background image"
          sx={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: 2 }}
        />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'absolute',
            bottom: -20,
            left: 0,
            px: '1%',
            width: '98%',
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
          {Number(idCurrentProfileString) === idCurrentAuthorizedUser && (
            <Button variant="contained" startIcon={<CloudDownloadOutlinedIcon />}>
              Edit Cover Photo
            </Button>
          )}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2, pb: 3, pt: 5 }}>
        <Typography variant="h5">
          {isLoadingUserCurrentProfile ? (
            <Skeleton sx={{ width: '100px' }} />
          ) : (
            userCurrentProfile && userCurrentProfile.name
          )}
        </Typography>

        {Number(idCurrentProfileString) === idCurrentAuthorizedUser ? (
          <Button>Edit basic info</Button>
        ) : (
          <Box>
            {(userCurrentProfile &&
              userCurrentProfile.friendsIds &&
              userCurrentProfile.friendsIds.includes(idCurrentAuthorizedUser) && (
                <Button onClick={handleClickRemoveFriend}>Remove friend</Button>
              )) ||
              (!isLoadingUserCurrentProfile ? (
                <Button onClick={handleClickAddFriend}>Add friend</Button>
              ) : (
                <Skeleton>
                  <Button sx={{ width: '120px' }}>*</Button>
                </Skeleton>
              ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
