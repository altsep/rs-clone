import { Routes, Route } from 'react-router-dom';
import Profile from './pages/Profile';

function App() {
  return (
    <>
      <header />
      <main>
        <Routes>
          <Route path="/id/:id" element={<Profile />} />
        </Routes>
      </main>
      <footer />
    </>
  );
}

export default App;
