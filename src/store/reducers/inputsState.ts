import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerNames } from '../../constants';
import { InputsState } from '../../types/state';

const initialState: InputsState = {
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
