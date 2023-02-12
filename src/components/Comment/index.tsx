import { useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { Box, Button, CardContent, IconButton, Stack, TextField, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ClickableAvatar from '../ClickableAvatar';
import { currentLocales } from '../../mock-data/data';
import { IComment } from '../../types/data';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ApiPath, API_BASE_URL } from '../../constants';
import { removeComment, updateComment } from '../../api/commentsApi';
import { editComment, removeCommentInState } from '../../store/reducers/commentsState';
import { UpdateCommentArg } from '../../types/commentsApi';
import { updatePost } from '../../api/postsApi';
import { UpdatePostArg } from '../../types/postsApi';

interface ICommentProps {
  commentData: IComment;
}

export default function Comment({ commentData }: ICommentProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [valueInputDescription, setValueInputDescription] = useState(commentData.description);

  const dispatch = useAppDispatch();
  const { authorizedUser, idAuthorizedUser } = useAppSelector((state) => state.users);

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
      const argUpdateComment: UpdateCommentArg = {
        likes: commentData.likes - 1,
        likedUserIds: commentData.likedUserIds.filter((likedCommentId) => likedCommentId !== idAuthorizedUser),
      };
      const dataResponse = await triggerUpdateComment(argUpdateComment);
      if (dataResponse) {
        dispatch(editComment(dataResponse));
      }
    } else {
      const argUpdateComment: UpdateCommentArg = {
        likes: commentData.likes + 1,
        likedUserIds: commentData.likedUserIds ? [...commentData.likedUserIds, idAuthorizedUser] : [idAuthorizedUser],
      };
      const dataResponse = await triggerUpdateComment(argUpdateComment);
      if (dataResponse) {
        dispatch(editComment(dataResponse));
      }
    }
  };

  const handleClickRemoveComment = async (): Promise<void> => {
    await triggerRemoveComment();
    // const argUpdatePost: UpdatePostArg = {

    // }
    // await triggerUpdatePost();
    dispatch(removeCommentInState(commentData.id));
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
    const argUpdateComment: UpdateCommentArg = {
      description: valueInputDescription,
    };
    const dataResponse = await triggerUpdateComment(argUpdateComment);
    if (dataResponse) {
      dispatch(editComment(dataResponse));
    }

    setIsEdit(false);
  };

  return (
    <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
      {authorizedUser && <ClickableAvatar user={authorizedUser} />}
      <Stack>
        {authorizedUser && <Typography>{authorizedUser.name}</Typography>}

        {!isEdit ? (
          <Typography>{commentData.description}</Typography>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <TextField
              multiline
              value={valueInputDescription}
              onChange={handleChangeCommentDescription}
              sx={{ flexGrow: 1 }}
            />
            <Button onClick={handleClickSaveButton}>Save</Button>
          </Box>
        )}

        <Typography>
          {new Date(commentData.createdAt).toLocaleString(currentLocales, {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Typography>
      </Stack>
      <Stack>
        <IconButton onClick={handleClickEditComment}>
          <EditIcon />
        </IconButton>
      </Stack>
      <Stack>
        <IconButton onClick={handleClickRemoveComment}>
          <ClearIcon />
        </IconButton>
        <IconButton onClick={handleClickLikeButton}>
          {commentData.likedUserIds?.includes(idAuthorizedUser) ? (
            <FavoriteOutlinedIcon />
          ) : (
            <FavoriteBorderOutlinedIcon />
          )}
          <Typography>{commentData.likes > 0 ? commentData.likes : ''}</Typography>
        </IconButton>
      </Stack>
    </CardContent>
  );
}
