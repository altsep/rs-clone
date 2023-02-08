import { Box, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';

import useParamsIdCurrentProfile from '../hooks/useParamsIdCurrentProfile';
import useUser from '../hooks/useUser';
import useUsers from '../hooks/useUsers';
import ClickableAvatar from './ClickableAvatar';

export default function ProfileFriends() {
  const { idCurrentProfile } = useParamsIdCurrentProfile();

  const { user, isLoading, isError } = useUser(idCurrentProfile);
  const { users, isLoading: isLoadingUsers, isError: isErrorUsers } = useUsers();

  if (isLoading || isLoadingUsers || isError || isErrorUsers) {
    return (
      <Card sx={{ minHeight: { xs: '200px', sm: '150px', md: '200px' } }}>
        <CardHeader title="Friends" sx={{ textAlign: 'center' }} />
        <CardContent>{}</CardContent>
      </Card>
    );
  }

  if (user && user.friendsIds && user.friendsIds.length > 0) {
    return (
      <Card sx={{ minHeight: { xs: '150px', md: '200px' } }}>
        <CardHeader title="Friends" sx={{ textAlign: 'center' }} />
        <CardContent>
          <Grid container rowSpacing={2}>
            {user.friendsIds.slice(0, 6).map((friendId) => {
              const friend = users && users.find((oneUser) => oneUser.id === friendId);
              return (
                <Grid item key={friendId} xs={12 / 3} sm={12 / 6} md={12 / 3}>
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
    <Card sx={{ minHeight: { xs: '150px', md: '200px' } }}>
      <CardHeader title="Friends" sx={{ textAlign: 'center' }} />
      <CardContent>
        <Typography>Empty. First add someone as a friend</Typography>
      </CardContent>
    </Card>
  );
}
