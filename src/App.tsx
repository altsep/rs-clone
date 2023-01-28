import React from 'react';
import { Routes } from 'react-router-dom';
import { Button } from '@mui/material';

function App(): JSX.Element {
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
