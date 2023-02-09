import { Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme } from './themes/darkTheme';
import { lightTheme } from './themes/lightTheme';
import { useAppSelector } from './hooks/redux';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Header from './components/Header';
import Profile from './pages/Profile';

function App() {
  const theme: string = useAppSelector((state) => state.theme.mode);
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <CssBaseline />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/:id" element={<Profile />} />
        </Routes>
      </main>
      <footer />
    </ThemeProvider>
  );
}

export default App;
