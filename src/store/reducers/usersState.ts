import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerNames } from '../../constants';
import { TUsersState } from '../../types/state';
import { IUser } from '../../types/data';
import { idAuthorizedUser as idAuthorizedUserMock } from '../../mock-data/data';

const initialState: TUsersState = {
  users: [],
  currentProfile: null,
  idCurrentProfile: 0,
  authorizedUser: null,
  idAuthorizedUser: idAuthorizedUserMock,
  defineUserCompleted: false,
  authorizedUserFriends: [],
  authorizedUserPendingFriends: [],
};

const usersStateSlice = createSlice({
  name: ReducerNames.users,
  initialState,
  reducers: {
    usersLoadingSuccess: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload;
      // FIX_ME Delete after adding logic authorization
      const findAuthorized = state.users.find((user) => user.id === state.idAuthorizedUser);
      if (findAuthorized) {
        state.authorizedUser = findAuthorized;
      }
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
    definePendingFriends: (state, action: PayloadAction<number[]>) => {
      state.authorizedUserPendingFriends = state.users.filter((user) => action.payload.includes(user.id));
    },
    defineFriends: (state, action: PayloadAction<number[]>) => {
      state.authorizedUserFriends = state.users.filter((user) => action.payload.includes(user.id));
    },
  },
});

export const { usersLoadingSuccess, defineProfile, updateUserInState, definePendingFriends, defineFriends } =
  usersStateSlice.actions;

export const usersState = usersStateSlice.reducer;
