import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { commentsState } from './reducers/commentsState';
import { postsState } from './reducers/postsState';
import { usersState } from './reducers/usersState';
import { leftSideBarState } from './reducers/leftSideBarState';
import { inputsState } from './reducers/inputsState';
import { ReducerNames } from '../constants';

const combinedReducers = combineReducers({
  [ReducerNames.inputs]: inputsState,
  [ReducerNames.leftSideBar]: leftSideBarState,
  [ReducerNames.users]: usersState,
  [ReducerNames.posts]: postsState,
  [ReducerNames.comments]: commentsState,
});

const store = configureStore({
  reducer: combinedReducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
