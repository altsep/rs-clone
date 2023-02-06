import { useParams } from 'react-router-dom';
import { Stack } from '@mui/material';
import Post from './Post';
import PostCreator from './PostCreator';
import usePosts from '../hooks/usePosts';
import useUser from '../hooks/useUser';

export default function ProfileFeed() {
  const { id: idCurrentProfileString } = useParams();

  const { user } = useUser(Number(idCurrentProfileString));
  const { posts } = usePosts();

  return (
    <Stack direction="column" gap={2} sx={{ flexGrow: '1' }}>
      <PostCreator />
      <Stack direction="column" gap={2}>
        {posts &&
          user &&
          posts
            .slice()
            .reverse()
            .filter((post) => user.postsIds && user.postsIds.includes(post.id))
            .map((post) => <Post key={post.id} postData={post} />)}
      </Stack>
    </Stack>
  );
}
