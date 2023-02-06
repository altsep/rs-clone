import { Avatar, Card, CardContent, CardHeader, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import useUser from '../hooks/useUser';
import useUsers from '../hooks/useUsers';
import ClickableAvatar from './ClickableAvatar';

export default function ProfileFriends() {
  const { id: idCurrentProfileString } = useParams();

  const { user } = useUser(Number(idCurrentProfileString));
  const { users } = useUsers();

  if (user && user.friendsIds && user.friendsIds.length > 0) {
    return (
      <Card>
        <CardHeader title="Friends" />
        <CardContent>
          <Grid container spacing={1}>
            {user.friendsIds.map((friendId) => {
              const friend = users && users.find((oneUser) => oneUser.id === friendId);

              return (
                <Grid item key={friendId} xs={4}>
                  {friend && <ClickableAvatar user={friend} />}
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
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Avatar />
          </Grid>
          <Grid item xs={4}>
            <Avatar />
          </Grid>
          <Grid item xs={4}>
            <Avatar />
          </Grid>
          <Grid item xs={4}>
            <Avatar />
          </Grid>
          <Grid item xs={4}>
            <Avatar />
          </Grid>
          <Grid item xs={4}>
            <Avatar />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
