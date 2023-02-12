import { useState } from 'react';
import useSWRMutation from 'swr/mutation';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { Button, CardContent, TextField } from '@mui/material';
import ClickableAvatar from '../ClickableAvatar';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ApiPath, API_BASE_URL } from '../../constants';
import { addComment } from '../../api/commentsApi';
import { AddCommentArg, UpdateCommentArg } from '../../types/commentsApi';
import { IPost } from '../../types/data';
import { addCommentInState } from '../../store/reducers/commentsState';
import { updatePost } from '../../api/postsApi';
import { UpdatePostArg } from '../../types/postsApi';
import { editPost } from '../../store/reducers/postsState';

interface ICommentCreatorProps {
  postData: IPost;
}

export default function CommentCreator({ postData }: ICommentCreatorProps) {
  const [valueInputComment, setValueInputComment] = useState('');

  const dispatch = useAppDispatch();
  const { authorizedUser, idAuthorizedUser } = useAppSelector((state) => state.users);

  const { trigger: triggerAddComment } = useSWRMutation(`${API_BASE_URL}${ApiPath.comments}`, addComment, {
    revalidate: false,
  });
  const { trigger: triggerUpdatePost } = useSWRMutation(`${API_BASE_URL}${ApiPath.posts}/${postData.id}`, updatePost);

  const handleChangeInputComment = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    if (e.target) {
      setValueInputComment(e.target.value);
    }
  };

  const handleClickSendButton = async (): Promise<void> => {
    const argAddComment: AddCommentArg = {
      userId: idAuthorizedUser,
      postId: postData.id,
      description: valueInputComment,
    };
    const responseDataAddComment = await triggerAddComment(argAddComment);
    if (responseDataAddComment) {
      const argUpdatePost: UpdatePostArg = {
        commentsIds: postData.commentsIds
          ? [...postData.commentsIds, responseDataAddComment.id]
          : [responseDataAddComment.id],
      };
      const responseDataUpdatePost = await triggerUpdatePost(argUpdatePost);
      if (responseDataUpdatePost) {
        dispatch(addCommentInState(responseDataAddComment));
        dispatch(editPost(responseDataUpdatePost));
      }
    }
    setValueInputComment('');
  };

  return (
    <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {authorizedUser && <ClickableAvatar user={authorizedUser} />}
      <TextField label="Write a comment..." value={valueInputComment} onChange={handleChangeInputComment} />
      <Button endIcon={<SendOutlinedIcon />} onClick={handleClickSendButton} disabled={!valueInputComment} />
    </CardContent>
  );
}
