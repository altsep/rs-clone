import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TAuthState } from '../../types/state';

const initialState: TAuthState = {
  isAuth: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
  },
});

export const { setAuth } = authSlice.actions;
export const authState = authSlice.reducer;
