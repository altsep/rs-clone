import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TAuthState } from '../../types/state';

const initialState: TAuthState = {
  isAuth: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setAuth, setLoading } = authSlice.actions;
export const authState = authSlice.reducer;
