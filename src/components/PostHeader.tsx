import useSWRMutation from 'swr/mutation';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { CardHeader, IconButton } from '@mui/material';
import ClickableAvatar from './ClickableAvatar';
import { IPost } from '../types/data';
import { currentLocales, idCurrentAuthorizedUser } from '../mock-data/data';
import MoreMenu from './MoreMenu';
import useUser from '../hooks/useUser';
import { VariantsMoreMenu, ApiPath, API_BASE_URL } from '../constants';
import { removePost } from '../api/postsApi';

interface IPostHeaderProps {
  postData: IPost;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PostHeader({ postData, setIsEdit }: IPostHeaderProps) {
  const { id: idCurrentProfileString } = useParams();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const { user } = useUser(postData.userId);

  const { trigger: triggerRemovePost } = useSWRMutation(`${API_BASE_URL}${ApiPath.posts}/${postData.id}`, removePost);

  const handleMoreButtonClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMoreMenu = (): void => {
    setAnchorEl(null);
  };

  const handleClickDeletePost = async (): Promise<void> => {
    // LOOK_AGAIN the delete functionality has not yet been fixed on the backend
    setAnchorEl(null);
    await triggerRemovePost();
  };

  const handleClickEditPost = (): void => {
    setAnchorEl(null);
    setIsEdit(true);
  };

  if (!user) {
    return <CardHeader>User not found</CardHeader>;
  }

  return (
    <>
      <CardHeader
        avatar={<ClickableAvatar user={user} />}
        title={user.name}
        subheader={new Date(postData.createdAt).toLocaleString(currentLocales, {
          day: 'numeric',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit',
        })}
        action={
          (postData.userId === idCurrentAuthorizedUser ||
            Number(idCurrentProfileString) === idCurrentAuthorizedUser) && (
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
        type={postData.userId === idCurrentAuthorizedUser ? VariantsMoreMenu.default : VariantsMoreMenu.withoutEdit}
      />
    </>
  );
}
