import { IUser } from './data';

interface IInputsState {
  valueCreatePost: string;
}

interface ILeftSideBarState {
  isOpen: boolean;
}

type TUserState = {
  users: IUser[];
  currentProfile: IUser | null;
  idCurrentProfile: number;
  authorizedUser: IUser | null;
  idAuthorizedUser: number;
};

export type { IInputsState, ILeftSideBarState, TUserState };
