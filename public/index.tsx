import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '../src/index.scss';
import App from '../src/App';
import reportWebVitals from '../src/reportWebVitals';

const container = document.getElementById('root') as HTMLDivElement;

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Measure performance by passing a function to log results
// (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. https://bit.ly/CRA-vitals
reportWebVitals();
