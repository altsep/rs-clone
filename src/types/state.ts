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

type TPostsState = {
  posts: IPost[];
  currentProfilePosts: IPost[];
};

type TPostLikes = {
  idPost: number;
  idAuthorizedUser: number;
};

type TEditPost = Pick<IPost, 'id' | 'description'>;

export type { IInputsState, ILeftSideBarState, TUsersState, TPostsState, TPostLikes, TEditPost };
