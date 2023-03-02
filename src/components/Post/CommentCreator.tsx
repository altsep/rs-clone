import { useState } from 'react';
import useSWRMutation from 'swr/mutation';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { Box, Button, CardContent, CircularProgress, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ClickableAvatar from '../ClickableAvatar';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ApiPath, API_BASE_URL } from '../../constants';
import { addComment } from '../../api/commentsApi';
import { TAddCommentArg } from '../../types/commentsApi';
import { IPost } from '../../types/data';
import { addCommentInState } from '../../store/reducers/commentsState';
import { updatePost } from '../../api/postsApi';
import { TUpdatePostArg } from '../../types/postsApi';
import { updatePostInState } from '../../store/reducers/postsState';
import usePosts from '../../hooks/usePosts';
import useComments from '../../hooks/useComments';

interface ICommentCreatorProps {
  postData: IPost;
  setIsOpenComments: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CommentCreator({ postData, setIsOpenComments }: ICommentCreatorProps) {
  const { t } = useTranslation();
  const [isLoading, setLoading] = useState(false);
  const [valueInputComment, setValueInputComment] = useState('');

  const dispatch = useAppDispatch();
  const { authorizedUser, idAuthorizedUser } = useAppSelector((state) => state.users);

  const { isLoadingPosts, isValidatingPosts } = usePosts();
  const { isLoadingComments, isValidatingComments } = useComments();

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
    setLoading(true);
    const argAddComment: TAddCommentArg = {
      userId: idAuthorizedUser,
      postId: postData.id,
      description: valueInputComment,
    };
    const responseDataAddComment = await triggerAddComment(argAddComment);
    if (responseDataAddComment) {
      const argUpdatePost: TUpdatePostArg = {
        commentsIds: postData.commentsIds
          ? [...postData.commentsIds, responseDataAddComment.id]
          : [responseDataAddComment.id],
      };
      const responseDataUpdatePost = await triggerUpdatePost(argUpdatePost);
      if (responseDataUpdatePost) {
        dispatch(addCommentInState(responseDataAddComment));
        dispatch(updatePostInState(responseDataUpdatePost));
      }
    }
    setValueInputComment('');
    setIsOpenComments(true);
    setLoading(false);
  };

  const handleKeyDownCreateComment = async (e: React.KeyboardEvent<HTMLDivElement>): Promise<void> => {
    if (e.key === 'Enter' && valueInputComment) {
      await handleClickSendButton();
      setIsOpenComments(true);
    }
  };

  return (
    <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
      <Box>{authorizedUser && <ClickableAvatar user={authorizedUser} />}</Box>
      <TextField
        label={t('profile.post.placeholder')}
        value={valueInputComment}
        onKeyDown={handleKeyDownCreateComment}
        onChange={handleChangeInputComment}
        size="small"
      />

      {isLoading ? (
        <CircularProgress size={20} sx={{ mr: 3 }} />
      ) : (
        <Button
          endIcon={<SendOutlinedIcon />}
          onClick={handleClickSendButton}
          disabled={
            !valueInputComment || isLoadingPosts || isValidatingPosts || isLoadingComments || isValidatingComments
          }
        />
      )}
    </CardContent>
  );
}
