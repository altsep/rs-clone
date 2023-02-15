import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import i18next from 'i18next';

type TLangState = {
  lang: string;
};

const initialState: TLangState = {
  lang: localStorage.getItem('i18nextLng') || 'en',
};

const langSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    switchLanguage(state, action: PayloadAction<string>) {
      state.lang = action.payload;
      i18next.changeLanguage(action.payload).catch((err: Error) => err);
    },
  },
});

export const { switchLanguage } = langSlice.actions;

export const langState = langSlice.reducer;
