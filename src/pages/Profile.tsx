import { useState, useEffect } from 'react';
import { Stack, Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import LeftSideBar from '../components/LeftSideBar';
import ProfileStack from '../components/ProfileStack';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { defineCurrentProfilePosts } from '../store/reducers/postsState';
import { defineProfile } from '../store/reducers/usersState';

export default function Profile() {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const { users, idAuthorizedUser, currentProfile, defineUserCompleted } = useAppSelector((state) => state.users);
  const { posts } = useAppSelector((state) => state.posts);

  useEffect(() => {
    if (id && users.length > 0 && idAuthorizedUser) {
      dispatch(defineProfile(id));
      if (currentProfile?.postsIds) {
        dispatch(defineCurrentProfilePosts(currentProfile.postsIds));
      }
    }
  }, [id, dispatch, users, idAuthorizedUser, currentProfile, posts]);

  if (currentProfile === null && defineUserCompleted) {
    return (
      <Container>
        <Stack direction="row" sx={{ gap: 2 }}>
          <LeftSideBar />
          <Typography
            variant="h2"
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh' }}
          >
            {' '}
            User not found
          </Typography>
        </Stack>
      </Container>
    );
  }

  return (
    <Container>
      <Stack direction="row" sx={{ gap: 2 }}>
        <LeftSideBar />
        <ProfileStack />
      </Stack>
    </Container>
  );
}
