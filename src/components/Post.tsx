import { useState, MouseEvent } from 'react';
import useSWRMutation from 'swr/mutation';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Avatar,
  Stack,
  Box,
} from '@mui/material';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import { IPost } from '../types/data';
import useUser from '../hooks/useUser';
import usePosts from '../hooks/usePosts';
import { API_BASE_URL, ApiPath } from '../constants';
import { RemovePostArg, UpdatePostArg } from '../types/postsApi';
import { removePost, updatePost } from '../api/postsApi';
import ClickableAvatar from './ClickableAvatar';
import { currentLocales, idCurrentAuthorizedUser } from '../mock-data/data';
import useUsers from '../hooks/useUsers';

interface IPostProps {
  postData: IPost;
}

export default function Post({ postData }: IPostProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const { user, isLoading } = useUser(postData.userId);
  const { users } = useUsers();

  const { user: currentAuthorizedUser } = useUser(idCurrentAuthorizedUser);

  const { mutate } = usePosts();

  const { trigger: triggerUpdatePost } = useSWRMutation(`${API_BASE_URL}${ApiPath.posts}/${postData.id}`, updatePost);
  const { trigger: triggerRemovePost } = useSWRMutation(`${API_BASE_URL}${ApiPath.posts}/${postData.id}`, removePost);

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

  const handleMoreButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMoreMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeletePostClick = async () => {
    //
  };

  const handleEditPostClick = async () => {
    //
  };

  return (
    <Card>
      {isLoading ? (
        <CircularProgress />
      ) : (
        user && (
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
            }
          />
        )
      )}
      <Menu
        id="post-menu"
        anchorEl={anchorEl}
        open={open}
        MenuListProps={{
          'aria-labelledby': 'resources-button',
        }}
        onClose={handleMoreMenuClose}
      >
        <MenuItem aria-label="post-delete" onClick={handleDeletePostClick}>
          Delete post
        </MenuItem>
        <MenuItem aria-label="post-edit" onClick={handleEditPostClick}>
          Edit
        </MenuItem>
      </Menu>
      <CardContent>
        <Typography variant="body1">{postData.description}</Typography>
      </CardContent>
      <CardMedia
        component="img"
        height="200"
        image="https://www.rgo.ru/sites/default/files/node/32473/yuriy-ufimcev-fioletovyy-zakat-536530.jpg"
      />
      <Stack direction="row" spacing={0.5}>
        {postData &&
          postData.likedUserIds &&
          postData.likedUserIds
            .slice(-3)
            .reverse()
            .map((likedUserId) => {
              if (users) {
                const currentUser = users.find((val) => val.id === likedUserId);
                return currentUser && <ClickableAvatar key={likedUserId} user={currentUser} />;
              }
              return '';
            })}
        <Box>
          {postData && postData.likedUserIds && postData.likedUserIds.length > 3 && (
            <Avatar>{`+${postData.likedUserIds.length - 3}`}</Avatar>
          )}
        </Box>
      </Stack>

      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          aria-label="Like"
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          onClick={handleLikeButtonClick}
        >
          {postData && postData.likedUserIds && postData.likedUserIds.includes(idCurrentAuthorizedUser) ? (
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
