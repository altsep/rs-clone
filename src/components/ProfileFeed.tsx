import { Stack } from '@mui/material';
import Post from './Post';
import PostCreator from './PostCreator';
import usePosts from '../hooks/usePosts';
import useUser from '../hooks/useUser';
import useParamsIdCurrentProfile from '../hooks/useParamsIdCurrentProfile';

export default function ProfileFeed() {
  const { idCurrentProfile } = useParamsIdCurrentProfile();

  const { user } = useUser(idCurrentProfile);
  const { posts } = usePosts();

  return (
    <Stack sx={{ flexDirection: 'column', gap: 2, flexGrow: '1', order: { xs: 3, md: 2 } }}>
      <PostCreator />
      <Stack sx={{ flexDirection: 'column', gap: 2 }}>
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
