import useSWRMutation from 'swr/mutation';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Badge, Avatar, IconButton, Skeleton, Stack } from '@mui/material';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useTranslation } from 'react-i18next';
import { MutableRefObject, useMemo, useRef, useState } from 'react';
import { ApiPath, API_BASE_URL, RoutePath } from '../../constants';
import { updateUser } from '../../api/usersApi';
import { TUpdateUserArg } from '../../types/usersApi';
import coverBackground from '../../assets/cover-background.webp';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateUserInState } from '../../store/reducers/usersState';
import { addChat } from '../../api/chatsApi';
import { addChatInState } from '../../store/reducers/chatsState';
import { isChat } from '../../types/predicates';
import useStatus from '../../hooks/useStatus';
import { sendImage } from '../../api/imagesApi';
import useImage from '../../hooks/useImage';
import ImageAlert from '../ImageAlert/ImageAlert';

export default function ProfileHeader() {
  useStatus();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { idCurrentProfile, idAuthorizedUser, currentProfile, authorizedUser, usersOfExistingChats } = useAppSelector(
    (state) => state.users
  );
  const currentLocale = useAppSelector((state) => state.language.lang);

  const {
    data: avatar = '',
    isLoading: avatarLoading,
    mutate: mutateAvatar,
  } = useImage(idCurrentProfile, 'user-avatar');

  const { data: cover = '', isLoading: coverLoading, mutate: mutateCover } = useImage(idCurrentProfile, 'user-cover');

  const [imageError, setImageError] = useState<boolean>(false);

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
  const { trigger: triggerAddChat } = useSWRMutation(`${API_BASE_URL}${ApiPath.chats}`, addChat);

  const { trigger: triggerAvatarChange } = useSWRMutation(
    `${API_BASE_URL}${ApiPath.images}/user-avatar/${idAuthorizedUser}`,
    sendImage
  );

  const { trigger: triggerCoverChange } = useSWRMutation(
    `${API_BASE_URL}${ApiPath.images}/user-cover/${idAuthorizedUser}`,
    sendImage
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

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    if (e.target.files) {
      const formData: FormData = new FormData();
      formData.append('user-avatar', e.target.files[0]);
      const res: Response | undefined = await triggerAvatarChange(formData);

      if (!res?.ok) {
        setImageError(true);
      }

      await mutateAvatar();
    }
  };

  const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    if (e.target.files) {
      const formData: FormData = new FormData();
      formData.append('user-cover', e.target.files[0]);
      const res: Response | undefined = await triggerCoverChange(formData);

      if (!res?.ok) {
        setImageError(true);
      }

      await mutateCover();
    }
  };

  const handleClickEditBasicInfo = () => {
    navigate(`${RoutePath.settings}`);
  };

  const handleClickWriteMessage = async () => {
    if (currentProfile) {
      if (
        !usersOfExistingChats.find(
          (userOfExistingChats) => userOfExistingChats && userOfExistingChats.id === currentProfile.id
        )
      ) {
        const argAddChat = { userIds: [idAuthorizedUser, idCurrentProfile] };
        const dataResponse = await triggerAddChat(argAddChat);
        if (isChat(dataResponse)) {
          dispatch(addChatInState(dataResponse));
        }
      }
      navigate(`${RoutePath.messages}/${idCurrentProfile}`);
    }
  };

  const handlePicker = (ref: MutableRefObject<HTMLInputElement | null>): void => {
    if (ref.current) {
      ref.current.click();
    }
  };

  const handleCloseError = () => setImageError(false);

  const isAvatarHidden = useMemo(
    () => idCurrentProfile !== idAuthorizedUser && currentProfile?.hidden,
    [idCurrentProfile, idAuthorizedUser, currentProfile]
  );

  return (
    <>
      <Box sx={{ borderRadius: 4, boxShadow: 4, overflow: 'hidden' }}>
        <Box
          component="img"
          src={cover || coverBackground}
          alt="Background image"
          sx={{ width: '100%', height: '300px', objectFit: 'cover', display: coverLoading ? 'none' : '' }}
        />
        {coverLoading && <Skeleton variant="rectangular" animation={false} sx={{ width: '100%', height: '300px' }} />}
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
              {currentProfile && (
                <Badge
                  overlap="circular"
                  sx={{ position: 'relative', display: avatarLoading ? 'none' : '' }}
                  badgeContent={
                    idCurrentProfile === idAuthorizedUser ? (
                      <IconButton
                        sx={{ background: 'white', p: 0.5, borderRadius: '50%', minWidth: '0' }}
                        onClick={() => handlePicker(avatarPicker)}
                      >
                        <input
                          hidden
                          accept=".jpg, .png"
                          type="file"
                          ref={avatarPicker}
                          onChange={handleAvatarChange}
                        />
                        <CloudDownloadOutlinedIcon />
                      </IconButton>
                    ) : null
                  }
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                  <Avatar
                    src={isAvatarHidden ? '' : avatar}
                    alt="Avatar"
                    sx={{ width: 150, height: 150, border: 3, borderColor: 'common.white' }}
                  >
                    {isAvatarHidden ? <VisibilityOffOutlinedIcon fontSize="large" /> : null}
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
              )}
              {avatarLoading && (
                <Skeleton variant="circular">
                  <Avatar sx={{ width: 150, height: 150 }} />
                </Skeleton>
              )}
              {idCurrentProfile === idAuthorizedUser && (
                <Button variant="contained" sx={{ gap: 1 }} onClick={() => handlePicker(coverPicker)}>
                  <input hidden accept=".jpg, .png" type="file" ref={coverPicker} onChange={handleCoverChange} />
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
                  <Button variant="contained" onClick={handleClickWriteMessage} sx={{ flexGrow: 1 }}>
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
      <ImageAlert open={imageError} handleCloseError={handleCloseError} />
    </>
  );
}
