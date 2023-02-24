interface IComment {
  userId: number;
  postId: number;
  id: number;
  description: string;
  createdAt: string;
  likes: number;
  likedUserIds?: number[];
}

interface IPost {
  userId: number;
  id: number;
  description: string;
  createdAt: string;
  likes: number;
  likedUserIds?: number[];
  commentsIds?: number[];
  images: string[];
}

interface IUser {
  id: number;
  email: string;
  name: string;
  password: string;
  hidden: boolean;
  country: string;
  birthDate: string;
  createdAt: string;
  alias?: string;
  postsIds?: number[];
  friendsIds?: number[];
  isActivated?: boolean;
  pendingFriendsIds?: number[];
  isOnline: boolean;
  lastSeen?: string;
  images: {
    avatar: string;
    cover: string;
  };
}

interface ILogin {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export type { IComment, IPost, IUser, ILogin };
