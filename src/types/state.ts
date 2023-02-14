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
};

type TPostsState = {
  posts: IPost[];
  currentProfilePosts: IPost[] | null;
};

type TCommentsState = {
  comments: IComment[];
};

export type { IInputsState, ILeftSideBarState, TUsersState, TPostsState, TCommentsState };
