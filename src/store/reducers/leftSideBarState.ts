import { createSlice } from '@reduxjs/toolkit';
import { ReducerNames } from '../../constants';
import { ILeftSideBarState } from '../../types/state';

const initialState: ILeftSideBarState = {
  isOpen: false,
};

const leftSideBarStateSlice = createSlice({
  name: ReducerNames.leftSideBar,
  initialState,
  reducers: {
    openLeftSideBar: (state) => {
      state.isOpen = true;
    },
    closeLeftSideBar: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openLeftSideBar, closeLeftSideBar } = leftSideBarStateSlice.actions;

export const leftSideBarState = leftSideBarStateSlice.reducer;
