import { IChat, IComment, IMessage, IPost, IUser, TLastMessage, TNumberOfUnreadMessages } from './data';

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
  avatarUrl: string;
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

type TChatsState = {
  chats: IChat[];
  activeChat: IChat | null;
  activeChatIndex: number;
  activeChatMessages: IMessage[];
  numberOfUnreadMessagesInChats: TNumberOfUnreadMessages[] | null;
  totalNumberOfUnreadMessages: number | null;
  lastMessagesInChats: TLastMessage[] | null;
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
  TChatsState,
  TChangeStatus,
};
