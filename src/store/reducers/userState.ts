import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerNames } from '../../constants';
import { TUserState } from '../../types/state';
import { IUser } from '../../types/data';
import { authorizedUser as authorizedUserMock, idAuthorizedUser as idAuthorizedUserMock } from '../../mock-data/data';

const initialState: TUserState = {
  users: [],
  currentProfile: null,
  idCurrentProfile: 0,
  authorizedUser: authorizedUserMock,
  idAuthorizedUser: idAuthorizedUserMock,
};

const userStateSlice = createSlice({
  name: ReducerNames.inputs,
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
        }
      }
    },
  },
});

export const { usersLoadingSuccess, defineProfile } = userStateSlice.actions;

export const userState = userStateSlice.reducer;
