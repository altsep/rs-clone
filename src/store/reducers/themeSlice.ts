import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TThemeState = {
  mode: string;
};

const initialState: TThemeState = {
  mode: localStorage.getItem('theme_wZpH9g') || 'Light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme(state, action: PayloadAction<string>) {
      state.mode = action.payload;
      localStorage.setItem('theme_wZpH9g', action.payload);
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export const themeState = themeSlice.reducer;
