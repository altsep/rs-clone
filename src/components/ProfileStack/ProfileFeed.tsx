import { TransitionGroup } from 'react-transition-group';
import { Collapse, Stack } from '@mui/material';
import { useAppSelector } from '../../hooks/redux';
import Post from '../Post';
import PostCreator from './PostCreator';

export default function ProfileFeed() {
  const { currentProfilePosts } = useAppSelector((state) => state.posts);

  return (
    <Stack
      sx={{
        flexDirection: 'column',
        gap: 2,
        flex: { xs: 0, md: '0 0 40%' },
        order: { xs: 3, md: 2 },
        backgroundColor: { xs: 'secondary.main', sm: 'transparent' },
      }}
    >
      <PostCreator />
      <TransitionGroup>
        {currentProfilePosts &&
          currentProfilePosts.map((post) => (
            <Collapse key={post.id}>
              <Post postData={post} />
            </Collapse>
          ))}
      </TransitionGroup>
    </Stack>
  );
}
