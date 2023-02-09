import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { inputsState } from './reducers/inputsState';
import { ReducerNames } from '../constants';

const combinedReducers = combineReducers({ [ReducerNames.inputs]: inputsState });

const store = configureStore({
  reducer: combinedReducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
