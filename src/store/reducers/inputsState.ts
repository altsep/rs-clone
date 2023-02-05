import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerNames } from '../../constants';
import { InputsState } from '../../types/state';

const initialState: InputsState = {
  valueCreatePost: '',
};

const inputsSlice = createSlice({
  name: ReducerNames.inputs,
  initialState,
  reducers: {
    changeCreatePost: (state, action: PayloadAction<string>) => {
      state.valueCreatePost = action.payload;
    },
  },
});

export const { changeCreatePost } = inputsSlice.actions;

export const inputsState = inputsSlice.reducer;
