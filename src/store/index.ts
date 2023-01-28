import { combineReducers, configureStore } from '@reduxjs/toolkit';
import slice, { ExampleStore } from './reducers';

const combinedReducers = combineReducers({ slice });

const store = configureStore<{ slice: ExampleStore }>({
  reducer: (state, action) => combinedReducers(state, action),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
