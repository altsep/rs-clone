import { useState } from 'react';
import useSWRMutation from 'swr/mutation';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  AvatarGroup,
  TextField,
} from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import { IPost } from '../../types/data';
import { API_BASE_URL, ApiPath } from '../../constants';
import { UpdatePostArg } from '../../types/postsApi';
import { updatePost } from '../../api/postsApi';
import ClickableAvatar from '../ClickableAvatar';
import PostHeader from './PostHeader';
import temporary from '../../assets/temporary-1.jpg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addLike, editPost, removeLike } from '../../store/reducers/postsState';

interface IPostProps {
  postData: IPost;
}

export default function Post({ postData }: IPostProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [valueInputDescription, setValueInputDescription] = useState(postData.description);

  const dispatch = useAppDispatch();
  const { users, idAuthorizedUser } = useAppSelector((state) => state.users);

  const { trigger: triggerUpdatePost } = useSWRMutation<IPost, Error>(
    `${API_BASE_URL}${ApiPath.posts}/${postData.id}`,
    updatePost
  );

  const handleClickLikeButton = async (): Promise<void> => {
    if (postData.likedUserIds && postData.likedUserIds.includes(idAuthorizedUser)) {
      const argUpdatePost: UpdatePostArg = {
        likes: postData.likes - 1,
        likedUserIds: postData.likedUserIds.filter((likedUserId) => likedUserId !== idAuthorizedUser),
      };
      dispatch(removeLike({ idAuthorizedUser, idPost: postData.id }));
      await triggerUpdatePost(argUpdatePost);
    } else {
      const argUpdatePost: UpdatePostArg = {
        likes: postData.likes + 1,
        likedUserIds: postData.likedUserIds ? [...postData.likedUserIds, idAuthorizedUser] : [idAuthorizedUser],
      };
      dispatch(addLike({ idAuthorizedUser, idPost: postData.id }));
      await triggerUpdatePost(argUpdatePost);
    }
  };

  const handleClickSaveButton = async (): Promise<void> => {
    const argUpdatePost: UpdatePostArg = {
      description: valueInputDescription,
    };
    dispatch(editPost({ id: postData.id, description: valueInputDescription }));
    await triggerUpdatePost(argUpdatePost);

    setIsEdit(false);
  };

  const handleChangeInputDescription = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    if (e.target) {
      setValueInputDescription(e.target.value);
    }
  };

  return (
    <Card>
      <PostHeader postData={postData} setIsEdit={setIsEdit} />
      <CardContent>
        {!isEdit ? (
          <Typography variant="body1" sx={{ wordBreak: 'break-all' }}>
            {postData.description}
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <TextField
              multiline
              value={valueInputDescription}
              onChange={handleChangeInputDescription}
              sx={{ flexGrow: 1 }}
            />
            <Button onClick={handleClickSaveButton}>Save</Button>
          </Box>
        )}
      </CardContent>
      <CardMedia component="img" height="200" image={temporary} />
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1, height: '44px' }}
      >
        {postData.likedUserIds && (
          <AvatarGroup max={4}>
            {postData.likedUserIds
              .slice()
              .reverse()
              .map((likedUserId) => {
                if (users) {
                  const currentUser = users.find((val) => val.id === likedUserId);
                  return currentUser && <ClickableAvatar key={likedUserId} user={currentUser} />;
                }
                return '';
              })}
          </AvatarGroup>
        )}
        <Typography sx={{ ml: 'auto' }}>{`${
          postData.commentsIds ? postData.commentsIds.length : 0
        } Comments`}</Typography>
      </Box>

      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          aria-label="Like"
          sx={{ display: 'flex', alignItems: 'center', gap: 1, p: { xs: 0, sm: '6px' } }}
          onClick={handleClickLikeButton}
        >
          {postData.likedUserIds && postData.likedUserIds.includes(idAuthorizedUser) ? (
            <FavoriteOutlinedIcon />
          ) : (
            <FavoriteBorderOutlinedIcon />
          )}

          <Typography sx={{ display: { xs: 'none', md: 'block' } }}>Like</Typography>
        </Button>
        <Button aria-label="Comments" sx={{ gap: 1, p: { xs: 0, sm: '6px' } }}>
          <CommentOutlinedIcon />
          <Typography sx={{ display: { xs: 'none', md: 'block' } }}>Comments</Typography>
        </Button>
        <Button aria-label="Share" sx={{ gap: 1, p: { xs: 0, sm: '6px' } }}>
          <ReplyOutlinedIcon sx={{ transform: 'scaleX(-1)' }} />
          <Typography sx={{ display: { xs: 'none', md: 'block' } }}>Share</Typography>
        </Button>
      </CardActions>
    </Card>
  );
}
