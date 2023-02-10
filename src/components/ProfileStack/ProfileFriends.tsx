import { Box, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { useAppSelector } from '../../hooks/redux';
import ClickableAvatar from '../ClickableAvatar';

export default function ProfileFriends() {
  const { currentProfile, users } = useAppSelector((state) => state.users);

  if (!currentProfile || currentProfile.friendsIds?.length === 0) {
    return (
      <Card sx={{ minHeight: { xs: '200px', sm: '150px', md: '200px' } }}>
        <CardHeader title="Friends" sx={{ textAlign: 'center' }} />
        <CardContent>{}</CardContent>
      </Card>
    );
  }

  if (currentProfile && currentProfile.friendsIds && currentProfile.friendsIds.length > 0) {
    return (
      <Card sx={{ minHeight: { xs: '150px', md: '200px' } }}>
        <CardHeader title="Friends" sx={{ textAlign: 'center' }} />
        <CardContent>
          <Grid container rowSpacing={2}>
            {currentProfile.friendsIds.slice(0, 6).map((friendId) => {
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
