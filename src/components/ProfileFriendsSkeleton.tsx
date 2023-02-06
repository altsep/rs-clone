import { Avatar, Box, Card, CardContent, CardHeader, Grid, Skeleton } from '@mui/material';

import { getNewArrayFilledWithSequence } from '../utils/common';

export default function ProfileFriendsSkeleton() {
  return (
    <Card>
      <CardHeader title="Friends" />
      <CardContent>
        <Grid container rowSpacing={2}>
          {getNewArrayFilledWithSequence(0, 5).map((number) => (
            <Grid item key={number} md={12 / 3} sm={12 / 2}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Skeleton variant="circular">
                  <Avatar />
                </Skeleton>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
