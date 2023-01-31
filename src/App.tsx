import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import useSWR from 'swr';
import { toggleStatus } from './store/reducers';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { fetcher } from './utils/fetcher';

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
    <div>
      <h1>Hello</h1>
    </div>
  );
}

export default App;
