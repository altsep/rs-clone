import React, { useEffect } from 'react';
import { Routes } from 'react-router-dom';
import { Button } from '@mui/material';
import { toggleStatus } from './store/reducers';
import { useAppSelector, useAppDispatch } from './store/hooks';

function App(): JSX.Element {
  const { exists } = useAppSelector((state) => state.example);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(toggleStatus());
  }, [dispatch]);

  useEffect(() => {
    console.log(exists);
  }, [exists]);

  return (
    <div>
      <h1>Hello</h1>
      <Button variant="outlined">Material UI button</Button>
      <Button variant="contained">Another button</Button>
      <Routes></Routes>
    </div>
  );
}

export default App;
