import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerNames } from '../../constants';
import { IInputsState } from '../../types/state';

const initialState: IInputsState = {
  valueCreatePost: '',
};

const inputsStateSlice = createSlice({
  name: ReducerNames.inputs,
  initialState,
  reducers: {
    changeCreatePost: (state, action: PayloadAction<string>) => {
      state.valueCreatePost = action.payload;
    },
  },
});

export const { changeCreatePost } = inputsStateSlice.actions;

export const inputsState = inputsStateSlice.reducer;
