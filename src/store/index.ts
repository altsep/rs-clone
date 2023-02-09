import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userState } from './reducers/userState';
import { leftSideBarState } from './reducers/leftSideBarState';
import { inputsState } from './reducers/inputsState';
import { ReducerNames } from '../constants';

const combinedReducers = combineReducers({
  [ReducerNames.inputs]: inputsState,
  [ReducerNames.leftSideBar]: leftSideBarState,
  [ReducerNames.user]: userState,
});

const store = configureStore({
  reducer: combinedReducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
