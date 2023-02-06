import { Box, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import useUser from '../hooks/useUser';
import useUsers from '../hooks/useUsers';
import ClickableAvatar from './ClickableAvatar';
import ProfileFriendsSkeleton from './ProfileFriendsSkeleton';

export default function ProfileFriends() {
  const { id: idCurrentProfileString } = useParams();

  const { user, isLoading } = useUser(Number(idCurrentProfileString));
  const { users, isLoading: isLoadingUsers } = useUsers();

  if (isLoading || isLoadingUsers) {
    return <ProfileFriendsSkeleton />;
  }

  if (user && user.friendsIds && user.friendsIds.length > 0) {
    return (
      <Card>
        <CardHeader title="Friends" />
        <CardContent>
          <Grid container rowSpacing={2}>
            {user.friendsIds.map((friendId) => {
              const friend = users && users.find((oneUser) => oneUser.id === friendId);
              return (
                <Grid item key={friendId} md={12 / 3} sm={12 / 2}>
                  {friend && (
                    <Box display="flex" justifyContent="center" alignItems="center">
                      <ClickableAvatar user={friend} />
                    </Box>
                  )}
                </Grid>
              );
            })}
          </Grid>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader title="Friends" />
      <CardContent>
        <Typography>Empty. First add someone as a friend</Typography>
      </CardContent>
    </Card>
  );
}
