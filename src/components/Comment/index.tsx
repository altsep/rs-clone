import { useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { Box, Button, Divider, IconButton, ListItem, Stack, TextField, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ClickableAvatar from '../ClickableAvatar';
import { IComment } from '../../types/data';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ApiPath, API_BASE_URL } from '../../constants';
import { removeComment, updateComment } from '../../api/commentsApi';
import { updateCommentInState, removeCommentInState } from '../../store/reducers/commentsState';
import { TUpdateCommentArg } from '../../types/commentsApi';
import { updatePost } from '../../api/postsApi';
import { TUpdatePostArg } from '../../types/postsApi';
import { updatePostInState } from '../../store/reducers/postsState';

interface ICommentProps {
  commentData: IComment;
}

export default function Comment({ commentData }: ICommentProps) {
  const currentLocale = useAppSelector((state) => state.language.lang);
  const [isEdit, setIsEdit] = useState(false);
  const [valueInputDescription, setValueInputDescription] = useState(commentData.description);

  const dispatch = useAppDispatch();
  const { idAuthorizedUser, users } = useAppSelector((state) => state.users);
  const { currentProfilePosts } = useAppSelector((state) => state.posts);

  const currentUser = users.find((user) => user.id === commentData.userId);

  const { trigger: triggerRemoveComment } = useSWRMutation(
    `${API_BASE_URL}${ApiPath.comments}/${commentData.id}`,
    removeComment
  );
  const { trigger: triggerUpdateComment } = useSWRMutation(
    `${API_BASE_URL}${ApiPath.comments}/${commentData.id}`,
    updateComment
  );
  const { trigger: triggerUpdatePost } = useSWRMutation(
    `${API_BASE_URL}${ApiPath.posts}/${commentData.postId}`,
    updatePost
  );

  const handleClickLikeButton = async (): Promise<void> => {
    if (commentData.likedUserIds?.includes(idAuthorizedUser)) {
      const argUpdateComment: TUpdateCommentArg = {
        likes: commentData.likes - 1,
        likedUserIds: commentData.likedUserIds.filter((likedCommentId) => likedCommentId !== idAuthorizedUser),
      };
      const dataResponse = await triggerUpdateComment(argUpdateComment);
      if (dataResponse) {
        dispatch(updateCommentInState(dataResponse));
      }
    } else {
      const argUpdateComment: TUpdateCommentArg = {
        likes: commentData.likes + 1,
        likedUserIds: commentData.likedUserIds ? [...commentData.likedUserIds, idAuthorizedUser] : [idAuthorizedUser],
      };
      const dataResponse = await triggerUpdateComment(argUpdateComment);
      if (dataResponse) {
        dispatch(updateCommentInState(dataResponse));
      }
    }
  };

  const handleClickRemoveComment = async (): Promise<void> => {
    await triggerRemoveComment();
    const currentPost = currentProfilePosts?.find((post) => post.id === commentData.postId);
    const argUpdatePost: TUpdatePostArg = {
      commentsIds: currentPost ? currentPost.commentsIds?.filter((commentId) => commentId !== commentData.id) : [],
    };
    const dataResponseUpdatePost = await triggerUpdatePost(argUpdatePost);
    if (dataResponseUpdatePost) {
      dispatch(removeCommentInState(commentData.id));
      dispatch(updatePostInState(dataResponseUpdatePost));
    }
  };

  const handleClickEditComment = (): void => {
    setIsEdit(true);
  };

  const handleChangeCommentDescription = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    if (e.target) {
      setValueInputDescription(e.target.value);
    }
  };

  const handleClickSaveButton = async (): Promise<void> => {
    const argUpdateComment: TUpdateCommentArg = {
      description: valueInputDescription,
    };
    const dataResponse = await triggerUpdateComment(argUpdateComment);
    if (dataResponse) {
      dispatch(updateCommentInState(dataResponse));
    }

    setIsEdit(false);
  };

  return (
    <ListItem sx={{ gap: 2, alignItems: 'flex-start' }}>
      {currentUser && <ClickableAvatar user={currentUser} width="30px" height="30px" />}
      <Stack sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {currentUser && <Typography sx={{ fontSize: '16px' }}>{currentUser.name}</Typography>}
          {idAuthorizedUser === commentData.userId && (
            <Box>
              <IconButton onClick={handleClickEditComment} sx={{ p: 0 }}>
                <EditIcon sx={{ fontSize: '16px' }} />
              </IconButton>
              <IconButton onClick={handleClickRemoveComment} sx={{ p: 0 }}>
                <ClearIcon sx={{ fontSize: '16px' }} />
              </IconButton>
            </Box>
          )}
        </Box>
        {!isEdit ? (
          <Typography variant="body2" component="span">
            <pre
              style={{
                maxHeight: '100px',
                overflowY: 'auto',
                fontFamily: 'inherit',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
              }}
            >
              {commentData.description}
            </pre>
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <TextField
              multiline
              value={valueInputDescription}
              onChange={handleChangeCommentDescription}
              sx={{ flexGrow: 1 }}
            />
            <Button onClick={handleClickSaveButton} sx={{ ml: 'auto' }}>
              Save
            </Button>
          </Box>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="caption">
            {new Date(commentData.createdAt).toLocaleString(currentLocale, {
              day: 'numeric',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Typography>
          <IconButton onClick={handleClickLikeButton} sx={{ p: 0 }}>
            {commentData.likedUserIds?.includes(idAuthorizedUser) ? (
              <FavoriteOutlinedIcon sx={{ fontSize: '16px' }} />
            ) : (
              <FavoriteBorderOutlinedIcon sx={{ fontSize: '16px' }} />
            )}
            <Typography variant="caption">{commentData.likes > 0 ? commentData.likes : ''}</Typography>
          </IconButton>
        </Box>
        <Divider />
        <Box />
      </Stack>
    </ListItem>
  );
}
