import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../types/data';

const initialState = {
  user: {} as IUser,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export const userState = userSlice.reducer;
