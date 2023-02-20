import { IComment, IPost, IUser } from './data';

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
  authorizedUserFriends: IUser[];
  authorizedUserPendingFriends: IUser[];
  messagesWs: WebSocket | null;
};

type TThemeState = {
  mode: string;
};

type TAuthState = {
  isAuth: boolean;
  isLoading: boolean;
  authError: boolean;
  confirmError: boolean;
};

type TLoginFormState = {
  passwordVisible: boolean;
  loginError: string;
};

type TPostsState = {
  posts: IPost[];
  currentProfilePosts: IPost[] | null;
};

type TCommentsState = {
  comments: IComment[];
};

type TChangeStatus = Pick<IUser, 'isOnline' | 'lastSeen'>;

export type {
  IInputsState,
  ILeftSideBarState,
  TUsersState,
  TPostsState,
  TCommentsState,
  TThemeState,
  TAuthState,
  TLoginFormState,
  TChangeStatus,
};
