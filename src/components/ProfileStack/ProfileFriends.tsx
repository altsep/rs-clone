import { Box, Card, CardContent, CardHeader, Divider, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../hooks/redux';
import ClickableAvatar from '../ClickableAvatar';

export default function ProfileFriends() {
  const { t } = useTranslation();
  const { currentProfile, users } = useAppSelector((state) => state.users);

  if (currentProfile && currentProfile.friendsIds && currentProfile.friendsIds.length > 0) {
    return (
      <Card sx={{ borderRadius: { xs: 0, sm: 4 }, boxShadow: { xs: 0, sm: 4, md: 0 } }}>
        <CardHeader title={t('profile.friends.title')} sx={{ textAlign: 'center' }} />
        <Divider />
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
    <Card sx={{ borderRadius: 4, boxShadow: { xs: 4, md: 0 } }}>
      <CardHeader title={t('profile.friends.title')} sx={{ textAlign: 'center' }} />
      <Divider />
      <CardContent>
        <Typography sx={{ textAlign: 'center' }}>{t('profile.friends.content')}</Typography>
      </CardContent>
    </Card>
  );
}
