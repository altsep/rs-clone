interface IComment {
  userId: number;
  postId: number;
  id: number;
  description: string;
  createdAt: string;
  likes: number;
}

interface IPost {
  userId: number;
  id: number;
  description: string;
  createdAt: string;
  likes: number;
  commentsIds?: number[];
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
  avatarURL?: string;
  postsIds?: number[];
  friendsIds?: number[];
}

export type { IComment, IPost, IUser };
