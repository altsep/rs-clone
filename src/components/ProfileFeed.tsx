import { useParams } from 'react-router-dom';
import { CircularProgress, Stack } from '@mui/material';
import Post from './Post';
import PostCreator from './PostCreator';
import usePosts from '../hooks/usePosts';
import useUser from '../hooks/useUser';

export default function ProfileFeed() {
  const { id: idCurrentProfile } = useParams();

  const { user } = useUser(Number(idCurrentProfile));

  const { posts, isLoading } = usePosts();

  return (
    <Stack direction="column" gap={2} sx={{ flexGrow: '1' }}>
      <PostCreator />
      <Stack direction="column" gap={2}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          posts &&
          user &&
          posts
            .slice()
            .reverse()
            .filter((post) => user.postsIds && user.postsIds.includes(post.id))
            .map((post) => <Post key={post.id} postData={post} />)
        )}
      </Stack>
    </Stack>
  );
}
