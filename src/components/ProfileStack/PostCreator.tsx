import React from 'react';
import { Avatar, Box, Button, Card, CardActions, CardContent, Skeleton, TextField, Typography } from '@mui/material';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import useSWRMutation from 'swr/mutation';
import { API_BASE_URL, ApiPath } from '../../constants';
import { addPost } from '../../api/postsApi';
import { TAddPostArg } from '../../types/postsApi';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeCreatePost } from '../../store/reducers/inputsState';
import { updateUser } from '../../api/usersApi';
import { TUpdateUserArg } from '../../types/usersApi';
import { idAuthorizedUser } from '../../mock-data/data';
import ClickableAvatar from '../ClickableAvatar';
import { addPostInState } from '../../store/reducers/postsState';
import { updateUserInState } from '../../store/reducers/usersState';

export default function PostCreator() {
  const dispatch = useAppDispatch();
  const { idCurrentProfile, currentProfile, authorizedUser } = useAppSelector((state) => state.users);
  const { valueCreatePost } = useAppSelector((state) => state.inputs);

  const { trigger: triggerAddPost } = useSWRMutation(`${API_BASE_URL}${ApiPath.posts}`, addPost, { revalidate: false });
  const { trigger: triggerUpdateUser } = useSWRMutation(
    `${API_BASE_URL}${ApiPath.users}/${idCurrentProfile}`,
    updateUser
  );

  const handleClickCreatePost = async (): Promise<void> => {
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
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    dispatch(changeCreatePost(e.target.value));
  };

  return (
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
            label="What's happening?"
            value={valueCreatePost}
            sx={{
              flexGrow: '1',
            }}
          />
        </CardContent>
      </Box>

      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button aria-label="Upload photo" sx={{ gap: 1 }}>
          <AddPhotoAlternateOutlinedIcon />
          <Typography sx={{ display: { xs: 'none', md: 'block' } }}>Photo</Typography>
        </Button>
        <Button
          variant="contained"
          aria-label="Create post"
          onClick={handleClickCreatePost}
          disabled={Boolean(!valueCreatePost)}
          sx={{ gap: 1 }}
        >
          <Typography>Post</Typography>
        </Button>
      </CardActions>
    </Card>
  );
}
