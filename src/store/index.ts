import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { themeState } from './reducers/themeSlice';
import { langState } from './reducers/langSlice';
import { authState } from './reducers/authSlice';
import { postsState } from './reducers/postsState';
import { usersState } from './reducers/usersState';
import { leftSideBarState } from './reducers/leftSideBarState';
import { inputsState } from './reducers/inputsState';
import { ReducerNames } from '../constants';
import { userState } from './reducers/userSlice';

const combinedReducers = combineReducers({
  [ReducerNames.inputs]: inputsState,
  theme: themeState,
  language: langState,
  auth: authState,
  user: userState,
  [ReducerNames.leftSideBar]: leftSideBarState,
  [ReducerNames.users]: usersState,
  [ReducerNames.posts]: postsState,
});

const store = configureStore({
  reducer: combinedReducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
