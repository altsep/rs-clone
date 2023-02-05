import useSWR from 'swr';
import { Routes, Route } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { fetcher } from './utils/fetcher';
import Login from './pages/Login';
import Registration from './pages/Registration';

interface Placeholder {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const { exists } = useAppSelector((state) => state.reducers);
  const dispatch = useAppDispatch();

  const { data, isLoading } = useSWR<Placeholder>('https://jsonplaceholder.typicode.com/todos/1', fetcher);

  return (
    <>
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
