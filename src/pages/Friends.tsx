import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Container, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import FriendCard from '../components/FriendCard';
import LeftSideBar from '../components/LeftSideBar';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { defineFriends, definePendingFriends } from '../store/reducers/usersState';
import TabPanel from '../components/TabPanel';
import useUsers from '../hooks/useUsers';

export default function Friends() {
  const { t } = useTranslation();
  const [value, setValue] = useState(0);

  const dispatch = useAppDispatch();
  const { users, idAuthorizedUser, authorizedUserFriends, authorizedUserPendingFriends } = useAppSelector(
    (state) => state.users
  );

  const { isLoadingUsers } = useUsers();

  const handleChangeTabs = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (idAuthorizedUser !== 0 && users) {
      const authorizedUser = users.find((user) => user.id === idAuthorizedUser);
      if (authorizedUser) {
        dispatch(definePendingFriends(authorizedUser.pendingFriendsIds || []));
        dispatch(defineFriends(authorizedUser.friendsIds || []));
      }
    }
  }, [dispatch, idAuthorizedUser, users]);

  return (
    <Container sx={{ mt: '5vh', mb: '5vh', display: 'flex' }}>
      <Stack direction="row" sx={{ gap: 2, minWidth: '100%' }}>
        <LeftSideBar />
        <Box
          sx={{ borderRadius: { xs: 0, sm: 4 }, boxShadow: { xs: 0, sm: 4 }, bgcolor: 'secondary.main', width: '100%' }}
        >
          <Tabs variant="fullWidth" value={value} onChange={handleChangeTabs} aria-label="basic tabs example">
            <Tab label={t('friends.friends')} id="simple-tab-0" aria-controls="simple-tabpanel-0" />
            <Tab label={t('friends.friendRequests')} id="simple-tab-1" aria-controls="simple-tabpanel-1" />
          </Tabs>
          {isLoadingUsers && (
            <TabPanel value={value} index={0} isEmpty>
              <CircularProgress />
            </TabPanel>
          )}
          {isLoadingUsers && (
            <TabPanel value={value} index={1} isEmpty>
              <CircularProgress />
            </TabPanel>
          )}
          {!isLoadingUsers && authorizedUserFriends.length !== 0 ? (
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
                    {t('friends.friendsEmpty')}
                  </Typography>
                </Grid>
              </Grid>
            </TabPanel>
          )}
          {!isLoadingUsers && authorizedUserPendingFriends.length !== 0 ? (
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
                    {t('friends.requestsEmpty')}
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
