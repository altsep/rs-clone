import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';
import FriendCard from '../components/FriendCard';
import LeftSideBar from '../components/LeftSideBar';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { defineFriends, definePendingFriends } from '../store/reducers/usersState';
import TabPanel from '../components/TabPanel';

export default function Friends() {
  const [value, setValue] = useState(0);

  const dispatch = useAppDispatch();
  const { users, authorizedUser, authorizedUserFriends, authorizedUserPendingFriends } = useAppSelector(
    (state) => state.users
  );

  const handleChangeTabs = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (authorizedUser && users) {
      dispatch(definePendingFriends(authorizedUser.pendingFriendsIds || []));
      dispatch(defineFriends(authorizedUser.friendsIds || []));
    }
  }, [dispatch, authorizedUser, users]);

  return (
    <Container sx={{ mt: '5vh', mb: '5vh', display: 'flex' }}>
      <Stack direction="row" sx={{ gap: 2, minWidth: '100%' }}>
        <LeftSideBar />
        <Box sx={{ borderRadius: 4, boxShadow: 4, bgcolor: 'secondary.main', width: '100%' }}>
          <Tabs variant="fullWidth" value={value} onChange={handleChangeTabs} aria-label="basic tabs example">
            <Tab label="Friends" id="simple-tab-0" aria-controls="simple-tabpanel-0" />
            <Tab label="Friend requests" id="simple-tab-1" aria-controls="simple-tabpanel-1" />
          </Tabs>
          {authorizedUserFriends.length !== 0 ? (
            <TabPanel value={value} index={0}>
              <Grid container spacing={2}>
                {authorizedUserFriends.map((friend) => (
                  <FriendCard key={friend.id} user={friend} isRequest={false} />
                ))}
              </Grid>
            </TabPanel>
          ) : (
            <TabPanel value={value} index={0} isEmpty>
              <Grid container spacing={2}>
                <Grid item xs={12} sx={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <Typography variant="h5" sx={{ textAlign: 'center' }}>
                    Empty. First add someone as a friend.
                  </Typography>
                </Grid>
              </Grid>
            </TabPanel>
          )}
          {authorizedUserPendingFriends.length !== 0 ? (
            <TabPanel value={value} index={1}>
              <Grid container spacing={2}>
                {authorizedUserPendingFriends.map((pendingFriend) => (
                  <FriendCard key={pendingFriend.id} user={pendingFriend} isRequest />
                ))}
              </Grid>
            </TabPanel>
          ) : (
            <TabPanel value={value} index={1} isEmpty>
              <Grid container spacing={2}>
                <Grid item xs={12} sx={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <Typography variant="h5" sx={{ textAlign: 'center' }}>
                    Empty. You don&apos;t have friend requests.
                  </Typography>
                </Grid>
              </Grid>
            </TabPanel>
          )}
        </Box>
      </Stack>
    </Container>
  );
}
