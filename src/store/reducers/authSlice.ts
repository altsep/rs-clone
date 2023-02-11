import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TAuthState } from '../../types/state';

const initialState: TAuthState = {
  auth: false,
};

const authSlice = createSlice({
  name: 'isAuth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
      state.auth = action.payload;
    },
  },
});

export const { setAuth } = authSlice.actions;
export const authState = authSlice.reducer;
