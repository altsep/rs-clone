import React, { useEffect, useState } from 'react';
import { useTheme } from '@emotion/react';
import { Box, Container, Grid, Stack, Tab, Tabs, Typography, useMediaQuery } from '@mui/material';
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
          <TabPanel value={value} index={0}>
            <Grid container spacing={2}>
              {authorizedUserFriends.map((friend) => (
                <FriendCard key={friend.id} user={friend} isRequest={false} />
              ))}
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid container spacing={2}>
              {authorizedUserPendingFriends.map((pendingFriend) => (
                <FriendCard key={pendingFriend.id} user={pendingFriend} isRequest />
              ))}
            </Grid>
          </TabPanel>
        </Box>
      </Stack>
    </Container>
  );
}
