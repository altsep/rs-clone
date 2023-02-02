import { Avatar, Card, CardContent, CardHeader, Grid } from '@mui/material';

export default function ProfileFriends() {
  const avatarsUrl = new Array<string>(6).fill('url');

  return (
    <Card>
      <CardHeader title="Friends" />
      <CardContent>
        <Grid container spacing={1}>
          {avatarsUrl.map((avatarUrl) => (
            <Grid item key={avatarUrl} xs={4}>
              <Avatar />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
