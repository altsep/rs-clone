import { combineReducers, configureStore } from '@reduxjs/toolkit';
import reducers, { DefaultState } from './reducers';

const combinedReducers = combineReducers({ reducers });

const store = configureStore<{ reducers: DefaultState }>({
  reducer: (state, action) => combinedReducers(state, action),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
