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
  Typography,
} from '@mui/material';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import { IPost } from '../../types/data';
import useUser from '../../hooks/useUser';
import usePosts from '../../hooks/usePosts';
import { API_BASE_URL, ApiPath } from '../../constants';
import { UpdatePostArg } from '../../types/postsApi';
import { updatePost } from '../../api/postsApi';
import ClickableAvatar from '../ClickableAvatar';
import { currentLocales, idCurrentAuthorizedUser } from '../../mock-data/data';

interface IPostProps {
  postData: IPost;
}

export default function Post({ postData }: IPostProps) {
  const { user, isLoading } = useUser(postData.userId);

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
              <IconButton aria-label="settings">
                <MoreHorizOutlinedIcon />
              </IconButton>
            }
          />
        )
      )}

      <CardContent>
        <Typography variant="body1">{postData.description}</Typography>
      </CardContent>
      <CardMedia
        component="img"
        height="200"
        image="https://www.rgo.ru/sites/default/files/node/32473/yuriy-ufimcev-fioletovyy-zakat-536530.jpg"
      />
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

          <Typography>{postData.likes > 0 && postData.likes}</Typography>
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
