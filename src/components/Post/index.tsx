import { useState } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { TransitionGroup } from 'react-transition-group';
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
  Badge,
  Popover,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import { useTranslation } from 'react-i18next';
import { IPost } from '../../types/data';
import { API_BASE_URL, ApiPath } from '../../constants';
import { TUpdatePostArg } from '../../types/postsApi';
import { updatePost } from '../../api/postsApi';
import ClickableAvatar from '../ClickableAvatar';
import PostHeader from './PostHeader';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updatePostInState } from '../../store/reducers/postsState';
import Comment from '../Comment';
import CommentCreator from './CommentCreator';
import { getHexStr } from '../../utils/common';
import { fetcher } from '../../utils/fetcher';

interface IPostProps {
  postData: IPost;
}

export default function Post({ postData }: IPostProps) {
  const MobileAndTablet = useMediaQuery('(min-width:900px)');
  const { t } = useTranslation();
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenComments, setIsOpenComments] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [valueInputDescription, setValueInputDescription] = useState(postData.description);

  const dispatch = useAppDispatch();
  const { users, idAuthorizedUser } = useAppSelector((state) => state.users);
  const { comments } = useAppSelector((state) => state.comments);

  const { trigger: triggerUpdatePost } = useSWRMutation<IPost, Error>(
    `${API_BASE_URL}${ApiPath.posts}/${postData.id}`,
    updatePost
  );

  const triggerAndUpdate = async (argUpdatePost: TUpdatePostArg): Promise<void> => {
    const dataResponse = await triggerUpdatePost(argUpdatePost);
    if (dataResponse) {
      dispatch(updatePostInState(dataResponse));
    }
  };

  const handleClickLikeButton = async (): Promise<void> => {
    if (postData.likedUserIds && postData.likedUserIds.includes(idAuthorizedUser)) {
      const argUpdatePost: TUpdatePostArg = {
        likes: postData.likes - 1,
        likedUserIds: postData.likedUserIds.filter((likedUserId) => likedUserId !== idAuthorizedUser),
      };
      await triggerAndUpdate(argUpdatePost);
    } else {
      const argUpdatePost: TUpdatePostArg = {
        likes: postData.likes + 1,
        likedUserIds: postData.likedUserIds ? [...postData.likedUserIds, idAuthorizedUser] : [idAuthorizedUser],
      };
      await triggerAndUpdate(argUpdatePost);
    }
  };

  const handleClickSaveButton = async (): Promise<void> => {
    const argUpdatePost: TUpdatePostArg = {
      description: valueInputDescription,
    };

    await triggerAndUpdate(argUpdatePost);

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

  const { data: images = [] } = useSWR<string[], Error>(
    postData.hasImages ? `${API_BASE_URL}${ApiPath.images}?name=post&id=${postData.id}` : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card sx={{ borderRadius: { xs: 0, sm: 4 }, boxShadow: { xs: 0, sm: 4, md: 0 }, mb: 2 }}>
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
              {t('settings.buttons.save')}
            </Button>
          </Box>
        )}
      </CardContent>
      {images.map((img) => (
        <CardMedia key={getHexStr()} component="img" height="200" image={img} />
      ))}
      <Divider sx={{ width: '94%', mx: 'auto' }} />
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          aria-label="Like"
          sx={{ display: 'flex', alignItems: 'center', gap: 1, p: { xs: 0, sm: '6px' } }}
          onClick={handleClickLikeButton}
          aria-owns={anchorEl ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
          {postData.likedUserIds && postData.likedUserIds.includes(idAuthorizedUser) ? (
            <FavoriteOutlinedIcon />
          ) : (
            <FavoriteBorderOutlinedIcon />
          )}

          <Typography sx={{ display: { xs: 'none', lg: 'block' } }}>{t('profile.post.like')}</Typography>
        </Button>
        {MobileAndTablet && postData.likedUserIds && postData.likedUserIds.length !== 0 && (
          <Popover
            id="mouse-over-popover"
            sx={{
              pointerEvents: 'none',
            }}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
            disableScrollLock
          >
            <Box>
              <AvatarGroup max={4}>
                {postData.likedUserIds
                  .slice()
                  .reverse()
                  .map((likedUserId) => {
                    if (users) {
                      const currentUser = users.find((val) => val.id === likedUserId);
                      return (
                        currentUser && (
                          <ClickableAvatar key={likedUserId} user={currentUser} width="20px" height="20px" />
                        )
                      );
                    }
                    return '';
                  })}
              </AvatarGroup>
            </Box>
          </Popover>
        )}
        <Button
          aria-label="Comments"
          onClick={handleClickComments}
          disabled={!postData.commentsIds || (postData.commentsIds && postData.commentsIds.length === 0)}
          sx={{ gap: 1, p: { xs: 0, sm: '6px' } }}
        >
          <Badge
            badgeContent={
              postData.commentsIds && (
                <Box sx={{ position: 'absolute', right: '3px' }}>{postData.commentsIds.length}</Box>
              )
            }
          >
            <CommentOutlinedIcon />
          </Badge>
          <Typography sx={{ display: { xs: 'none', lg: 'block' } }}>{t('profile.post.comments')}</Typography>
        </Button>
        <Button aria-label="Share" sx={{ gap: 1, p: { xs: 0, sm: '6px' } }}>
          <ReplyOutlinedIcon sx={{ transform: 'scaleX(-1)' }} />
          <Typography sx={{ display: { xs: 'none', lg: 'block' } }}>{t('profile.post.share')}</Typography>
        </Button>
      </CardActions>
      <Divider sx={{ width: '94%', mx: 'auto' }} />
      <Collapse in={isOpenComments} timeout="auto" unmountOnExit>
        <List>
          <TransitionGroup>
            {comments.map(
              (comment) =>
                comment.postId === postData.id && (
                  <Collapse key={comment.id}>
                    <Comment commentData={comment} />
                  </Collapse>
                )
            )}
          </TransitionGroup>
        </List>
      </Collapse>
      <CommentCreator postData={postData} setIsOpenComments={setIsOpenComments} />
    </Card>
  );
}
