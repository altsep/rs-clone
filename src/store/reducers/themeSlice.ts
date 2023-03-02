import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LSKeys, KEY_LOCAL_STORAGE } from '../../constants';
import { TThemeState } from '../../types/state';

const initialState: TThemeState = {
  mode: localStorage.getItem(`${LSKeys.theme}_${KEY_LOCAL_STORAGE}`) || 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme(state, action: PayloadAction<string>) {
      state.mode = action.payload;
      localStorage.setItem(`${LSKeys.theme}_${KEY_LOCAL_STORAGE}`, action.payload);
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export const themeState = themeSlice.reducer;
