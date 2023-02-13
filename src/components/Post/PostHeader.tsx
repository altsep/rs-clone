import useSWRMutation from 'swr/mutation';
import React, { useState } from 'react';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { CardHeader, IconButton } from '@mui/material';
import ClickableAvatar from '../ClickableAvatar';
import { IPost } from '../../types/data';
import { currentLocales, idAuthorizedUser } from '../../mock-data/data';
import MoreMenu from './MoreMenu';
import { VariantsMoreMenu, ApiPath, API_BASE_URL } from '../../constants';
import { removePost } from '../../api/postsApi';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { removePostInState } from '../../store/reducers/postsState';
import { updateUser } from '../../api/usersApi';
import { TUpdateUserArg } from '../../types/usersApi';
import { filterCommentsByPostId } from '../../store/reducers/commentsState';

interface IPostHeaderProps {
  postData: IPost;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PostHeader({ postData, setIsEdit }: IPostHeaderProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const dispatch = useAppDispatch();
  const { idCurrentProfile, users } = useAppSelector((state) => state.users);

  const open = Boolean(anchorEl);
  const currentUser = users.find((user) => user.id === postData.userId);

  const { trigger: triggerRemovePost } = useSWRMutation(`${API_BASE_URL}${ApiPath.posts}/${postData.id}`, removePost);
  const { trigger: triggerUpdateUser } = useSWRMutation(
    `${API_BASE_URL}${ApiPath.users}/${postData.userId}`,
    updateUser
  );

  const handleMoreButtonClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMoreMenu = (): void => {
    setAnchorEl(null);
  };

  const handleClickDeletePost = async (): Promise<void> => {
    if (currentUser) {
      setAnchorEl(null);
      await triggerRemovePost();
      const argUpdateUser: TUpdateUserArg = {
        postsIds: currentUser.postsIds ? currentUser.postsIds.filter((postId) => postId !== postData.id) : [],
      };
      await triggerUpdateUser(argUpdateUser);
      dispatch(removePostInState(postData.id));
      dispatch(filterCommentsByPostId(postData.id));
    }
  };

  const handleClickEditPost = (): void => {
    setAnchorEl(null);
    setIsEdit(true);
  };

  if (!currentUser) {
    return <CardHeader>User not found</CardHeader>;
  }

  return (
    <>
      <CardHeader
        avatar={<ClickableAvatar user={currentUser} />}
        title={currentUser.name}
        subheader={new Date(postData.createdAt).toLocaleString(currentLocales, {
          day: 'numeric',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit',
        })}
        action={
          (postData.userId === idAuthorizedUser || idCurrentProfile === idAuthorizedUser) && (
            <IconButton
              aria-label="post-settings"
              id="post-button"
              onClick={handleMoreButtonClick}
              aria-controls={open ? 'post-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <MoreHorizOutlinedIcon />
            </IconButton>
          )
        }
      />

      <MoreMenu
        anchorEl={anchorEl}
        open={open}
        handleCloseMoreMenu={handleCloseMoreMenu}
        handleClickDeletePost={handleClickDeletePost}
        handleClickEditPost={handleClickEditPost}
        type={postData.userId === idAuthorizedUser ? VariantsMoreMenu.default : VariantsMoreMenu.withoutEdit}
      />
    </>
  );
}
