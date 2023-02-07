import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Registration from './pages/Registration';

function App() {
  return (
    <>
      <CssBaseline />
      <header />
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </main>
      <footer />
    </>
  );
}

export default App;
