import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerNames } from '../../constants';
import { TUsersState } from '../../types/state';
import { IUser } from '../../types/data';
import { authorizedUser as authorizedUserMock, idAuthorizedUser as idAuthorizedUserMock } from '../../mock-data/data';

const initialState: TUsersState = {
  users: [],
  currentProfile: null,
  idCurrentProfile: 0,
  authorizedUser: authorizedUserMock,
  idAuthorizedUser: idAuthorizedUserMock,
  defineUserCompleted: false,
};

const usersStateSlice = createSlice({
  name: ReducerNames.users,
  initialState,
  reducers: {
    usersLoadingSuccess: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload;
    },
    defineProfile: (state, action: PayloadAction<string>) => {
      if (action.payload.slice(0, 2) === 'id') {
        const possibleId = Number(action.payload.slice(2));
        const foundUser = state.users.find((user) => user.id === possibleId);
        if (foundUser) {
          state.currentProfile = foundUser;
          state.idCurrentProfile = possibleId;
        }
      } else {
        const foundUser = state.users.find((user) => user.alias === action.payload);
        if (foundUser) {
          state.currentProfile = foundUser;
          state.idCurrentProfile = foundUser.id;
        } else {
          state.currentProfile = null;
          state.idCurrentProfile = 0;
        }
      }
      state.defineUserCompleted = true;
    },
    updateUserInState: (state, action: PayloadAction<IUser>) => {
      state.users = state.users.map((user) => (user.id === action.payload.id ? action.payload : user));
      if (action.payload.id === state.idAuthorizedUser) {
        state.authorizedUser = action.payload;
      }
      if (action.payload.id === state.idCurrentProfile) {
        state.currentProfile = action.payload;
      }
    },
  },
});

export const { usersLoadingSuccess, defineProfile, updateUserInState } = usersStateSlice.actions;

export const usersState = usersStateSlice.reducer;
