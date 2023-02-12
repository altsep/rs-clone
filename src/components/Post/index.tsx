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
  Divider,
  List,
  Collapse,
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
import { updatePostInState } from '../../store/reducers/postsState';
import Comment from '../Comment';
import CommentCreator from './CommentCreator';

interface IPostProps {
  postData: IPost;
}

export default function Post({ postData }: IPostProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenComments, setIsOpenComments] = useState(false);

  const [valueInputDescription, setValueInputDescription] = useState(postData.description);

  const dispatch = useAppDispatch();
  const { users, idAuthorizedUser } = useAppSelector((state) => state.users);
  const { comments } = useAppSelector((state) => state.comments);

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
      const dataResponse = await triggerUpdatePost(argUpdatePost);
      if (dataResponse) {
        dispatch(updatePostInState(dataResponse));
      }
    } else {
      const argUpdatePost: UpdatePostArg = {
        likes: postData.likes + 1,
        likedUserIds: postData.likedUserIds ? [...postData.likedUserIds, idAuthorizedUser] : [idAuthorizedUser],
      };
      const dataResponse = await triggerUpdatePost(argUpdatePost);
      if (dataResponse) {
        dispatch(updatePostInState(dataResponse));
      }
    }
  };

  const handleClickSaveButton = async (): Promise<void> => {
    const argUpdatePost: UpdatePostArg = {
      description: valueInputDescription,
    };
    const dataResponse = await triggerUpdatePost(argUpdatePost);
    if (dataResponse) {
      dispatch(updatePostInState(dataResponse));
    }

    setIsEdit(false);
  };

  const handleChangeInputDescription = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    if (e.target) {
      setValueInputDescription(e.target.value);
    }
  };

  const handleClickComments = (): void => {
    setIsOpenComments(!isOpenComments);
  };

  return (
    <Card>
      <PostHeader postData={postData} setIsEdit={setIsEdit} />
      <CardContent>
        {!isEdit ? (
          <Typography variant="body1" component="span">
            <pre style={{ fontFamily: 'inherit', whiteSpace: 'pre-wrap', wordBreak: 'break-all', margin: 0 }}>
              {postData.description}
            </pre>
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <TextField
              multiline
              value={valueInputDescription}
              onChange={handleChangeInputDescription}
              sx={{ flexGrow: 1, width: '100%' }}
            />
            <Button onClick={handleClickSaveButton} sx={{ ml: 'auto' }}>
              Save
            </Button>
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
                  return (
                    currentUser && <ClickableAvatar key={likedUserId} user={currentUser} width="20px" height="20px" />
                  );
                }
                return '';
              })}
          </AvatarGroup>
        )}
        <Typography sx={{ ml: 'auto' }}>{`${
          postData.commentsIds ? postData.commentsIds.length : 0
        } Comments`}</Typography>
      </Box>
      <Divider sx={{ width: '94%', mx: 'auto' }} />
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
        <Button aria-label="Comments" onClick={handleClickComments} sx={{ gap: 1, p: { xs: 0, sm: '6px' } }}>
          <CommentOutlinedIcon />
          <Typography sx={{ display: { xs: 'none', md: 'block' } }}>Comments</Typography>
        </Button>
        <Button aria-label="Share" sx={{ gap: 1, p: { xs: 0, sm: '6px' } }}>
          <ReplyOutlinedIcon sx={{ transform: 'scaleX(-1)' }} />
          <Typography sx={{ display: { xs: 'none', md: 'block' } }}>Share</Typography>
        </Button>
      </CardActions>
      <Divider sx={{ width: '94%', mx: 'auto' }} />
      <Collapse in={isOpenComments} timeout="auto" unmountOnExit>
        <List>
          {comments.map(
            (comment) => comment.postId === postData.id && <Comment key={comment.id} commentData={comment} />
          )}
        </List>
      </Collapse>
      <CommentCreator postData={postData} setIsOpenComments={setIsOpenComments} />
    </Card>
  );
}
