import { IChat, IComment, IMessage, IPost, IUser } from './data';

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
  usersOfExistingChats: (IUser | undefined)[];
  userOfActiveChat: IUser | null;
};

type TThemeState = {
  mode: string;
};

type TAuthState = {
  isAuth: boolean;
  isLoading: boolean;
  authError: boolean;
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

// CHANGE_NAME
type TNumberOfNewMessagesInChat = {
  userId: number;
  counter: number;
};

type TChatsState = {
  chats: IChat[];
  activeChat: IChat | null;
  activeChatIndex: number;
  activeChatMessages: IMessage[];
  // CHANGE_NAME
  numberOfNewMessagesInChats: TNumberOfNewMessagesInChat[];
  totalNumberOfNewMessages: number;
};

export type {
  IInputsState,
  ILeftSideBarState,
  TUsersState,
  TPostsState,
  TCommentsState,
  TThemeState,
  TAuthState,
  TLoginFormState,
  TNumberOfNewMessagesInChat,
  TChatsState,
};
