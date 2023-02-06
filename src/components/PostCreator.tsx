import { useParams } from 'react-router-dom';
import { Avatar, Box, Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import useSWRMutation from 'swr/mutation';
import { API_BASE_URL, ApiPath } from '../constants';
import { addPost } from '../api/postsApi';
import { AddPostArg } from '../types/postsApi';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { changeCreatePost } from '../store/reducers/inputsState';
import { updateUser } from '../api/usersApi';
import useUser from '../hooks/useUser';
import { isAddPostResponse } from '../types/predicates';
import { UpdateUserArg } from '../types/usersApi';
import { idCurrentAuthorizedUser } from '../mock-data/data';
import ClickableAvatar from './ClickableAvatar';

export default function PostCreator() {
  const dispatch = useAppDispatch();
  const { id: idCurrentProfileString } = useParams();
  const { valueCreatePost } = useAppSelector((state) => state.inputs);

  const { trigger: triggerAddPost } = useSWRMutation(`${API_BASE_URL}${ApiPath.posts}`, addPost);
  const { trigger: triggerUpdateUser } = useSWRMutation(
    `${API_BASE_URL}${ApiPath.users}/${Number(idCurrentProfileString)}`,
    updateUser
  );

  const { user } = useUser(Number(idCurrentProfileString));
  const { user: currentAuthorizedUser } = useUser(idCurrentAuthorizedUser);

  const handleClickCreatePost = async () => {
    const argAddPost: AddPostArg = {
      createdAt: new Date(Date.now()).toISOString(),
      description: valueCreatePost,
      userId: idCurrentAuthorizedUser,
    };

    try {
      const responseData = await triggerAddPost(argAddPost);
      if (isAddPostResponse(responseData) && user) {
        const argUpdateUser: UpdateUserArg = {
          postsIds: user.postsIds ? [...user.postsIds, responseData.id] : [responseData.id],
        };
        await triggerUpdateUser(argUpdateUser);
      }
    } catch (err) {
      console.error(err);
    }

    dispatch(changeCreatePost(''));
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(changeCreatePost(e.target.value));
  };

  return (
    <Card>
      <Box>
        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {currentAuthorizedUser ? <ClickableAvatar user={currentAuthorizedUser} /> : <Avatar />}
          <TextField
            onChange={handleChangeInput}
            label="What's happening?"
            value={valueCreatePost}
            sx={{ flexGrow: '1' }}
          />
        </CardContent>
      </Box>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button aria-label="Upload photo" sx={{ gap: 1 }}>
          <AddPhotoAlternateOutlinedIcon />
          <Typography>Photo</Typography>
        </Button>
        <Button onClick={handleClickCreatePost} variant="contained" aria-label="Create post" sx={{ gap: 1 }}>
          <Typography>Post</Typography>
        </Button>
      </CardActions>
    </Card>
  );
}
