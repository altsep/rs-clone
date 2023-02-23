import React, { useRef, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  IconButton,
  Skeleton,
  TextField,
  Typography,
} from '@mui/material';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import CloseIcon from '@mui/icons-material/Close';
import useSWRMutation from 'swr/mutation';
import { useTranslation } from 'react-i18next';
import { API_BASE_URL, ApiPath } from '../../constants';
import { addPost } from '../../api/postsApi';
import { TAddPostArg } from '../../types/postsApi';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeCreatePost } from '../../store/reducers/inputsState';
import { updateUser } from '../../api/usersApi';
import { TUpdateUserArg } from '../../types/usersApi';
import ClickableAvatar from '../ClickableAvatar';
import { addPostInState } from '../../store/reducers/postsState';
import { updateUserInState } from '../../store/reducers/usersState';
import ImageAlert from '../ImageAlert/ImageAlert';

export default function PostCreator() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [isLoading, setLoading] = useState(false);
  const [postPhoto, setPostPhoto] = useState<File | null>(null);
  const [photoError, setPhotoError] = useState(false);

  const { idCurrentProfile, currentProfile, authorizedUser, idAuthorizedUser } = useAppSelector((state) => state.users);
  const { valueCreatePost } = useAppSelector((state) => state.inputs);

  const photoPicker = useRef<HTMLInputElement | null>(null);

  const { trigger: triggerAddPost } = useSWRMutation(`${API_BASE_URL}${ApiPath.posts}`, addPost, { revalidate: false });
  const { trigger: triggerUpdateUser } = useSWRMutation(
    `${API_BASE_URL}${ApiPath.users}/${idCurrentProfile}`,
    updateUser
  );

  const handleClickCreatePost = async (): Promise<void> => {
    setLoading(true);
    const argAddPost: TAddPostArg = {
      description: valueCreatePost,
      userId: idAuthorizedUser,
    };
    const responseDataAppPost = await triggerAddPost(argAddPost);
    if (responseDataAppPost && currentProfile) {
      const argUpdateUser: TUpdateUserArg = {
        postsIds: currentProfile.postsIds
          ? [...currentProfile.postsIds, responseDataAppPost.id]
          : [responseDataAppPost.id],
      };
      const responseDataUpdateUser = await triggerUpdateUser(argUpdateUser);
      if (responseDataUpdateUser) {
        dispatch(addPostInState(responseDataAppPost));
        dispatch(updateUserInState(responseDataUpdateUser));
      }
    }
    dispatch(changeCreatePost(''));
    setLoading(false);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    dispatch(changeCreatePost(e.target.value));
  };

  const handleChangePhoto = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        const fileSize = file.size / 1000000;
        if (fileSize > 5) {
          setPhotoError(true);
        } else {
          setPostPhoto(file);
        }
      }
    }
  };

  const removePhoto = (): void => {
    setPostPhoto(null);
  };

  const handlePhotoPicker = (): void => {
    if (photoPicker.current) {
      photoPicker.current.click();
    }
  };

  const handleCloseError = (): void => setPhotoError(false);

  return (
    <>
      <Card sx={{ borderRadius: 4, boxShadow: { xs: 4, md: 0 } }}>
        <Box>
          <CardContent sx={{ display: 'flex', gap: 2 }}>
            {authorizedUser ? (
              <Box sx={{ mt: '8px' }}>
                <ClickableAvatar user={authorizedUser} />
              </Box>
            ) : (
              <Skeleton variant="circular">
                <Avatar />
              </Skeleton>
            )}
            <TextField
              multiline
              onChange={handleChangeInput}
              label={t('profile.addPost.label')}
              value={valueCreatePost}
              sx={{
                flexGrow: '1',
              }}
            />
          </CardContent>
          {postPhoto && (
            <Box sx={{ maxWidth: '150px', p: '16px', position: 'relative' }}>
              <IconButton
                size="small"
                sx={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-10px',
                  '&.MuiButtonBase-root:hover': {
                    bgcolor: 'transparent',
                  },
                }}
                onClick={removePhoto}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
              <Box component="img" src={URL.createObjectURL(postPhoto)} alt="Post photo" sx={{ width: '100%' }} />
            </Box>
          )}
        </Box>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <input hidden accept=".jpg, .png" type="file" ref={photoPicker} onChange={handleChangePhoto} />
          <Button aria-label="Upload photo" sx={{ gap: 1 }} onClick={handlePhotoPicker}>
            <AddPhotoAlternateOutlinedIcon />
            <Typography sx={{ display: { xs: 'none', md: 'block' } }}>{t('profile.addPost.photo')}</Typography>
          </Button>
          {isLoading ? (
            <CircularProgress size={20} sx={{ mr: 3 }} />
          ) : (
            <Button
              variant="contained"
              aria-label="Create post"
              onClick={handleClickCreatePost}
              disabled={Boolean(!valueCreatePost)}
              sx={{ gap: 1 }}
            >
              <Typography>{t('profile.addPost.button')}</Typography>
            </Button>
          )}
        </CardActions>
      </Card>
      <ImageAlert open={photoError} handleCloseError={handleCloseError} />
    </>
  );
}
