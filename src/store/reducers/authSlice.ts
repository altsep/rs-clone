import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TAuthState } from '../../types/state';

const initialState: TAuthState = {
  isAuth: false,
  isLoading: false,
  authError: false,
  confirmError: false,
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
    setAuthError(state, action: PayloadAction<boolean>) {
      state.authError = action.payload;
    },
    setConfirmError(state, action: PayloadAction<boolean>) {
      state.confirmError = action.payload;
    },
  },
});

export const { setAuth, setLoading, setAuthError, setConfirmError } = authSlice.actions;
export const authState = authSlice.reducer;
