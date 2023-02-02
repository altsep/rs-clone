import { Container } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Profile from './pages/Profile';

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/:id" element={<Profile />} />
      </Routes>
    </Container>
  );
}

export default App;
