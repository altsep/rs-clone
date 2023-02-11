import React from 'react';
import { Avatar, Box, Button, Card, CardActions, CardContent, Skeleton, TextField, Typography } from '@mui/material';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import useSWRMutation from 'swr/mutation';
import { API_BASE_URL, ApiPath } from '../../constants';
import { addPost } from '../../api/postsApi';
import { AddPostArg } from '../../types/postsApi';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeCreatePost } from '../../store/reducers/inputsState';
import { updateUser } from '../../api/usersApi';
import { UpdateUserArg } from '../../types/usersApi';
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
    const argAddPost: AddPostArg = {
      createdAt: new Date(Date.now()).toISOString(),
      description: valueCreatePost,
      userId: idAuthorizedUser,
    };
    const responseDataAppPost = await triggerAddPost(argAddPost);
    if (responseDataAppPost && currentProfile) {
      const argUpdateUser: UpdateUserArg = {
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

  const handleKeyDownCreatePost = async (e: React.KeyboardEvent<HTMLDivElement>): Promise<void> => {
    if (e.key === 'Enter' && valueCreatePost) {
      await handleClickCreatePost();
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    dispatch(changeCreatePost(e.target.value));
  };

  return (
    <Card>
      <Box>
        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {authorizedUser ? (
            <ClickableAvatar user={authorizedUser} />
          ) : (
            <Skeleton variant="circular">
              <Avatar />
            </Skeleton>
          )}
          <TextField
            onChange={handleChangeInput}
            onKeyDown={handleKeyDownCreatePost}
            label="What's happening?"
            value={valueCreatePost}
            sx={{ flexGrow: '1' }}
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
