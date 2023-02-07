import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TLangState = {
  lang: string;
};

const initialState: TLangState = {
  lang: localStorage.getItem('lang_wZpH9g') || 'EN',
};

const langSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changeLanguage(state, action: PayloadAction<string>) {
      state.lang = action.payload;
      localStorage.setItem('lang_wZpH9g', action.payload);
    },
  },
});

export const { changeLanguage } = langSlice.actions;

export const langState = langSlice.reducer;
