import { createSlice } from '@reduxjs/toolkit';

interface DefaultState {
  exists: boolean;
  value: null | string;
}

const initialState: DefaultState = {
  exists: false,
  value: null,
};

export const slice = createSlice({
  name: 'default',
  initialState,
  reducers: {
    setProperty: (state, action) => {
      const { name, value } = action.payload as { name: keyof DefaultState; value: unknown };
      return { ...state, [name]: value };
    },
    setValue: (state, action) => ({
      ...state,
      value: action.payload as string,
    }),
    toggleStatus: (state) => ({ ...state, exists: !state.exists }),
  },
});

export type { DefaultState };

export const { setProperty, setValue, toggleStatus } = slice.actions;

export default slice.reducer;
