import React from 'react';
import { SWRConfig } from 'swr';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/store';
import App from '../src/App';
import '../src/index.scss';

const container = document.getElementById('root') as HTMLDivElement;

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <SWRConfig
          value={{
            onError: (error: Error) => {
              console.error(error.message);
            },
          }}
        >
          <App />
        </SWRConfig>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
