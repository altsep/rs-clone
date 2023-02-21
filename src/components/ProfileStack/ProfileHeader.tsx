import useSWRMutation from 'swr/mutation';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Badge, Avatar, IconButton, Skeleton, Stack } from '@mui/material';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useTranslation } from 'react-i18next';
import { MutableRefObject, useRef } from 'react';
import { ApiPath, API_BASE_URL, RoutePath } from '../../constants';
import { updateUser } from '../../api/usersApi';
import { TUpdateUserArg } from '../../types/usersApi';
import temporary from '../../assets/temporary-2.webp';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateUserInState } from '../../store/reducers/usersState';
import useStatus from '../../hooks/useStatus';

export default function ProfileHeader() {
  useStatus();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const currentLocale = useAppSelector((state) => state.language.lang);
  const { idCurrentProfile, idAuthorizedUser, currentProfile, authorizedUser } = useAppSelector((state) => state.users);

  const avatarPicker = useRef<HTMLInputElement | null>(null);
  const coverPicker = useRef<HTMLInputElement | null>(null);

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

  const handleClickFollow = async (): Promise<void> => {
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

  const handleClickEditBasicInfo = () => {
    navigate(`${RoutePath.settings}`);
  };

  const handlePicker = (ref: MutableRefObject<HTMLInputElement | null>): void => {
    if (ref.current) {
      ref.current.click();
    }
  };

  return (
    <Box sx={{ borderRadius: 4, boxShadow: 4, overflow: 'hidden' }}>
      <Box
        component="img"
        src={temporary}
        alt="Background image"
        sx={{ width: '100%', height: '300px', objectFit: 'cover' }}
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
                sx={{ position: 'relative' }}
                badgeContent={
                  idCurrentProfile === idAuthorizedUser ? (
                    <IconButton
                      sx={{ background: 'white', p: 0.5, borderRadius: '50%', minWidth: '0' }}
                      onClick={() => handlePicker(avatarPicker)}
                    >
                      <input hidden accept=".jpg, .png" type="file" ref={avatarPicker} />
                      <CloudDownloadOutlinedIcon />
                    </IconButton>
                  ) : null
                }
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              >
                <Avatar
                  src={idCurrentProfile !== idAuthorizedUser && currentProfile.hidden ? '' : currentProfile.avatarURL}
                  alt="Avatar"
                  sx={{ width: 150, height: 150, border: 3, borderColor: 'common.white' }}
                >
                  {idCurrentProfile !== idAuthorizedUser && currentProfile.hidden && currentProfile.avatarURL !== '' ? (
                    <VisibilityOffOutlinedIcon fontSize="large" />
                  ) : null}
                </Avatar>
                <Box
                  sx={{
                    width: '15px',
                    bgcolor: currentProfile.isOnline ? 'green' : '#78909c',
                    height: '15px',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '60%',
                    right: 0,
                    transform: 'translateX(20%)',
                  }}
                />
              </Badge>
            ) : (
              <Skeleton variant="circular">
                <Avatar sx={{ width: 150, height: 150 }} />
              </Skeleton>
            )}
            {idCurrentProfile === idAuthorizedUser && (
              <Button variant="contained" sx={{ gap: 1 }} onClick={() => handlePicker(coverPicker)}>
                <input hidden accept=".jpg, .png" type="file" ref={coverPicker} />
                <CloudDownloadOutlinedIcon />
                <Typography sx={{ display: { xs: 'none', md: 'block' } }}>{t('profile.header.editCover')}</Typography>
              </Button>
            )}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2,
          pb: 3,
          pt: 5,
          minHeight: '36.5px',
        }}
      >
        <Stack>
          <Typography variant="h5">{currentProfile && currentProfile.name}</Typography>
          {currentProfile && currentProfile.isOnline ? (
            <Typography variant="body2">{t('profile.online')}</Typography>
          ) : null}
          {currentProfile && !currentProfile.isOnline ? (
            <Typography variant="body2">
              {currentProfile.lastSeen
                ? `${t('profile.lastSeen')} ${new Date(currentProfile.lastSeen).toLocaleString(currentLocale, {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}`
                : t('profile.offline')}
            </Typography>
          ) : null}
        </Stack>
        {idCurrentProfile === idAuthorizedUser && (
          <Button variant="outlined" onClick={handleClickEditBasicInfo} sx={{ background: 'secondary.main' }}>
            {t('profile.header.editInfo')}
          </Button>
        )}
        {idCurrentProfile !== idAuthorizedUser && (
          <Box>
            {(authorizedUser?.pendingFriendsIds?.includes(idCurrentProfile) && (
              <Button variant="outlined" onClick={handleClickFollow}>
                {t('profile.header.acceptRequest')}
              </Button>
            )) ||
              (currentProfile?.friendsIds?.includes(idAuthorizedUser) && (
                <Button variant="contained" sx={{ flexGrow: 1 }}>
                  {t('profile.header.message')}
                </Button>
              )) ||
              (currentProfile?.pendingFriendsIds?.includes(idAuthorizedUser) && (
                <Button variant="outlined" disabled>
                  {t('profile.header.sentRequest')}
                </Button>
              )) || (
                <Button variant="outlined" onClick={handleClickAddFriend}>
                  {t('profile.header.addFriend')}
                </Button>
              )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
