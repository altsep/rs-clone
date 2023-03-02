import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { commentsState } from './reducers/commentsState';
import { themeState } from './reducers/themeSlice';
import { langState } from './reducers/langSlice';
import { authState } from './reducers/authSlice';
import { postsState } from './reducers/postsState';
import { usersState } from './reducers/usersState';
import { leftSideBarState } from './reducers/leftSideBarState';
import { inputsState } from './reducers/inputsState';
import { ReducerNames } from '../constants';
import { chatsState } from './reducers/chatsState';

const combinedReducers = combineReducers({
  [ReducerNames.inputs]: inputsState,
  [ReducerNames.theme]: themeState,
  [ReducerNames.language]: langState,
  [ReducerNames.auth]: authState,
  [ReducerNames.leftSideBar]: leftSideBarState,
  [ReducerNames.users]: usersState,
  [ReducerNames.posts]: postsState,
  [ReducerNames.comments]: commentsState,
  [ReducerNames.chats]: chatsState,
});

const store = configureStore({
  reducer: combinedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
