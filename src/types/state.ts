import { IPost, IUser } from './data';

interface IInputsState {
  valueCreatePost: string;
}

interface ILeftSideBarState {
  isOpen: boolean;
}

type TUsersState = {
  users: IUser[];
  currentProfile: IUser | null;
  idCurrentProfile: number;
  authorizedUser: IUser | null;
  idAuthorizedUser: number;
  defineUserCompleted: boolean;
};

type TThemeState = {
  mode: string;
};

type TAuthState = {
  isAuth: boolean;
};

type TLoginFormState = {
  passwordVisible: boolean;
  loginError: string;
};

type TPostsState = {
  posts: IPost[];
  currentProfilePosts: IPost[] | null;
};

export type { IInputsState, ILeftSideBarState, TUsersState, TPostsState, TThemeState, TAuthState, TLoginFormState };
