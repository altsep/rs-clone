import { useEffect } from 'react';
import { Stack, Container, Typography, CircularProgress, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LeftSideBar from '../components/LeftSideBar';
import ProfileStack from '../components/ProfileStack';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { defineCurrentProfilePosts } from '../store/reducers/postsState';
import { defineProfile } from '../store/reducers/usersState';

export default function Profile() {
  const { t } = useTranslation();
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const { users, idAuthorizedUser, currentProfile, defineUserCompleted } = useAppSelector((state) => state.users);
  const { posts } = useAppSelector((state) => state.posts);

  useEffect(() => {
    if (id && users.length > 0 && idAuthorizedUser) {
      dispatch(defineProfile(id));
    }
    if (currentProfile?.postsIds) {
      dispatch(defineCurrentProfilePosts(currentProfile.postsIds));
    }
  }, [id, dispatch, users, idAuthorizedUser, posts, currentProfile]);

  if (currentProfile === null && defineUserCompleted) {
    return (
      <Container sx={{ mt: '5vh', mb: '5vh', display: 'flex' }}>
        <Stack direction="row" sx={{ gap: 2, minWidth: '100%' }}>
          <LeftSideBar />
          <Typography
            variant="h3"
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh' }}
          >
            {t('profile.notFound')}
          </Typography>
        </Stack>
      </Container>
    );
  }

  if (!defineUserCompleted) {
    return (
      <Container sx={{ mt: '5vh', mb: '5vh', display: 'flex' }}>
        <Stack direction="row" sx={{ gap: 2, minWidth: '100%' }}>
          <LeftSideBar />
          <Typography
            variant="h3"
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh' }}
          >
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          </Typography>
        </Stack>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: '5vh', mb: '5vh', display: 'flex' }}>
      <Stack direction="row" sx={{ gap: 2, minWidth: '100%' }}>
        <LeftSideBar />
        <ProfileStack />
      </Stack>
    </Container>
  );
}
