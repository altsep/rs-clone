import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import { toggleStatus } from './store/reducers';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { useFetch } from './hooks/useFetch';

interface Placeholder {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

function App(): JSX.Element {
  const { exists } = useAppSelector((state) => state.example);
  const dispatch = useAppDispatch();

  const { data, loading } = useFetch<Placeholder>('https://jsonplaceholder.typicode.com/todos/1');

  useEffect(() => {
    console.log('exists: ', exists);
  }, [exists]);

  useEffect(() => {
    console.log('data: ', data);

    if (data) {
      dispatch(toggleStatus());
    }
  }, [data, dispatch]);

  return (
    <div>
      <h1>Hello</h1>
      <Button variant="outlined">Material UI button</Button>
      <Button variant="contained">Another button</Button>
      <p>{loading ? 'Loading...' : data && JSON.stringify(data)}</p>
    </div>
  );
}

export default App;
