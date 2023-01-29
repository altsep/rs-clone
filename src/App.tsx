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

function App(): JSX.Element {
  const { exists } = useAppSelector((state) => state.reducers);
  const dispatch = useAppDispatch();

  const { data, isLoading } = useSWR<Placeholder>('https://jsonplaceholder.typicode.com/todos/1', fetcher);

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
      <p>Exists: {String(exists)}</p>
      <p>{isLoading ? 'Loading...' : data && JSON.stringify(data)}</p>
      <Button
        variant="outlined"
        onClick={(): void => {
          dispatch(toggleStatus());
        }}
      >
        Material UI button
      </Button>
      <Button variant="contained">Another button</Button>
    </div>
  );
}

export default App;
