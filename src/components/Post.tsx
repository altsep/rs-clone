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
import { IPost } from '../types/data';
import usePosts from '../hooks/usePosts';
import { API_BASE_URL, ApiPath } from '../constants';
import { UpdatePostArg } from '../types/postsApi';
import { updatePost } from '../api/postsApi';
import ClickableAvatar from './ClickableAvatar';
import { idCurrentAuthorizedUser } from '../mock-data/data';
import useUsers from '../hooks/useUsers';
import PostHeader from './PostHeader';

interface IPostProps {
  postData: IPost;
}

export default function Post({ postData }: IPostProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [valueInputDescription, setValueInputDescription] = useState(postData.description);

  const { users } = useUsers();
  const { mutate } = usePosts();

  const { trigger: triggerUpdatePost } = useSWRMutation(`${API_BASE_URL}${ApiPath.posts}/${postData.id}`, updatePost);

  const handleLikeButtonClick = async () => {
    try {
      if (postData.likedUserIds && postData.likedUserIds.includes(idCurrentAuthorizedUser)) {
        const argUpdatePost: UpdatePostArg = {
          likes: postData.likes - 1,
          likedUserIds: postData.likedUserIds.filter((likedUserId) => likedUserId !== idCurrentAuthorizedUser),
        };
        await triggerUpdatePost(argUpdatePost);
      } else {
        const argUpdatePost: UpdatePostArg = {
          likes: postData.likes + 1,
          likedUserIds: postData.likedUserIds
            ? [...postData.likedUserIds, idCurrentAuthorizedUser]
            : [idCurrentAuthorizedUser],
        };
        await triggerUpdatePost(argUpdatePost);
      }
      await mutate();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveButtonClick = async () => {
    try {
      const argUpdatePost: UpdatePostArg = {
        description: valueInputDescription,
      };
      await triggerUpdatePost(argUpdatePost);
      await mutate();
      setIsEdit(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangeInputDescription = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
            <Button onClick={handleSaveButtonClick}>Save</Button>
          </Box>
        )}
      </CardContent>
      <CardMedia
        component="img"
        height="200"
        image="https://www.rgo.ru/sites/default/files/node/32473/yuriy-ufimcev-fioletovyy-zakat-536530.jpg"
      />
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
        {postData.commentsIds && <Typography>{`${postData.commentsIds.length} Comments`}</Typography>}
      </Box>

      <CardActions sx={{ display: 'flex', justifyContent: 'space-between', px: 2 }}>
        <Button
          aria-label="Like"
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          onClick={handleLikeButtonClick}
        >
          {postData.likedUserIds && postData.likedUserIds.includes(idCurrentAuthorizedUser) ? (
            <FavoriteOutlinedIcon />
          ) : (
            <FavoriteBorderOutlinedIcon />
          )}

          <Typography>Like</Typography>
        </Button>
        <Button aria-label="Comments" sx={{ gap: 1 }}>
          <CommentOutlinedIcon />
          <Typography>Comments</Typography>
        </Button>
        <Button aria-label="Share" sx={{ gap: 1 }}>
          <ReplyOutlinedIcon sx={{ transform: 'scaleX(-1)' }} />
          <Typography>Share</Typography>
        </Button>
      </CardActions>
    </Card>
  );
}
