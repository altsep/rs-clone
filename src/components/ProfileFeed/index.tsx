import { Stack } from '@mui/material';
import Post from '../Post';
import PostCreator from '../PostCreator';

export default function ProfileFeed() {
  return (
    <Stack direction="column" gap={2} sx={{ flexGrow: '1' }}>
      <PostCreator />

      <Post />
      <Post />
    </Stack>
  );
}
