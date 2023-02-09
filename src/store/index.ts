import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { themeState } from './reducers/themeSlice';
import { langState } from './reducers/langSlice';
import { inputsState } from './reducers/inputsState';
import { ReducerNames } from '../constants';

const combinedReducers = combineReducers({
  [ReducerNames.inputs]: inputsState,
  theme: themeState,
  language: langState,
});

const store = configureStore({
  reducer: combinedReducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
