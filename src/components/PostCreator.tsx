import { Avatar, Box, Button, Card, CardActions, CardContent, Skeleton, TextField, Typography } from '@mui/material';
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
import { idAuthorizedUser } from '../mock-data/data';
import ClickableAvatar from './ClickableAvatar';
import useParamsIdCurrentProfile from '../hooks/useParamsIdCurrentProfile';

export default function PostCreator() {
  const { idCurrentProfile } = useParamsIdCurrentProfile();

  const dispatch = useAppDispatch();
  const { valueCreatePost } = useAppSelector((state) => state.inputs);

  const { user, isLoading, isError } = useUser(idCurrentProfile);
  const { user: currentAuthorizedUser } = useUser(idAuthorizedUser);
  const { trigger: triggerAddPost } = useSWRMutation(`${API_BASE_URL}${ApiPath.posts}`, addPost);
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

    const responseData = await triggerAddPost(argAddPost);
    if (isAddPostResponse(responseData) && user) {
      const argUpdateUser: UpdateUserArg = {
        postsIds: user.postsIds ? [...user.postsIds, responseData.id] : [responseData.id],
      };
      await triggerUpdateUser(argUpdateUser);
    }

    dispatch(changeCreatePost(''));
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    dispatch(changeCreatePost(e.target.value));
  };

  return (
    <Card>
      <Box>
        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {currentAuthorizedUser ? (
            <ClickableAvatar user={currentAuthorizedUser} />
          ) : (
            <Skeleton variant="circular">
              <Avatar />
            </Skeleton>
          )}
          <TextField
            onChange={handleChangeInput}
            label="What's happening?"
            value={valueCreatePost}
            sx={{ flexGrow: '1' }}
          />
        </CardContent>
      </Box>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button aria-label="Upload photo" sx={{ gap: 1 }} disabled={Boolean(isLoading || isError)}>
          <AddPhotoAlternateOutlinedIcon />
          <Typography sx={{ display: { xs: 'none', md: 'block' } }}>Photo</Typography>
        </Button>
        <Button
          variant="contained"
          aria-label="Create post"
          onClick={handleClickCreatePost}
          disabled={Boolean(!valueCreatePost || isError)}
          sx={{ gap: 1 }}
        >
          <Typography>Post</Typography>
        </Button>
      </CardActions>
    </Card>
  );
}
