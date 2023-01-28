import { combineReducers, configureStore } from '@reduxjs/toolkit';
import example, { ExampleStore } from './reducers';

const combinedReducers = combineReducers({ example });

const store = configureStore<{ example: ExampleStore }>({
  reducer: (state, action) => combinedReducers(state, action),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
