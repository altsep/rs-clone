import { Stack, Container } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LeftSideBar from '../components/LeftSideBar';
import ProfileHeader from '../components/ProfileHeader';
import ProfileInner from '../components/ProfileInner';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { defineProfile } from '../store/reducers/userState';

export default function Profile() {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (id && users.length > 0) {
      dispatch(defineProfile(id));
    }
  }, [id, dispatch, users]);

  return (
    <Container>
      <Stack direction="row" sx={{ gap: 2 }}>
        <LeftSideBar />
        <Stack sx={{ direction: 'column', gap: 2, flexGrow: '1' }}>
          <ProfileHeader />
          <ProfileInner />
        </Stack>
      </Stack>
    </Container>
  );
}
