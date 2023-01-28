import { createSlice } from '@reduxjs/toolkit';

export interface ExampleStore {
  exists: boolean;
  value: null | string;
}

const initialState: ExampleStore = {
  exists: false,
  value: null,
};

export const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    setProperty: (state, action) => {
      const { name, value } = action.payload as { name: keyof ExampleStore; value: unknown };
      return { ...state, [name]: value };
    },
    setValue: (state, action) => ({
      ...state,
      value: action.payload as string,
    }),
    toggleStatus: (state) => ({ ...state, exists: true }),
  },
});

export const { setProperty, setValue, toggleStatus } = exampleSlice.actions;

export default exampleSlice.reducer;
