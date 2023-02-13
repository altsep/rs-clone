import { Container, Box, Divider, Stack } from '@mui/material';
import LeftSideBar from '../components/LeftSideBar';
import SettingsMenu from '../components/Settings/SettingsMenu/SettingsMenu';
import SettingsContent from '../components/Settings/SettingsContent/SettingsContent';

export default function Settings() {
  return (
    <Container sx={{ mt: '5vh', mb: '5vh', display: 'flex' }}>
      <Stack direction="row" sx={{ gap: 2, minWidth: '100%' }}>
        <LeftSideBar />
        <Box
          sx={{
            borderRadius: 4,
            boxShadow: 4,
            display: 'flex',
            bgcolor: 'secondary.main',
            flex: 1,
          }}
        >
          <SettingsMenu />
          <Divider orientation="vertical" flexItem />
          <SettingsContent />
        </Box>
      </Stack>
    </Container>
  );
}
