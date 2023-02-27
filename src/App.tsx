import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme } from './themes/darkTheme';
import { lightTheme } from './themes/lightTheme';
import { useAppSelector } from './hooks/redux';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import useMessagesWs from './hooks/useMessagesWs';
import Routes from './components/Routes';
import useAuth from './hooks/useAuth';
import useData from './hooks/useData';
import useChats from './hooks/useChats';

export default function App() {
  const theme = useAppSelector((state) => state.theme.mode);
  useAuth();
  useMessagesWs();
  useData();
  useChats();
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <CssBaseline />
      <Header />
      <Box component="main" sx={{ flex: 1, display: 'flex', justifyContent: 'center', pb: '5vh' }}>
        <Routes />
      </Box>
      <Footer />
    </ThemeProvider>
  );
}
