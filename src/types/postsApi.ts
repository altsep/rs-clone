import { IPost, IUser } from './data';

type AddPostArg = Pick<IPost, 'userId' | 'description' | 'createdAt'>;

type UpdatePostArg = Partial<Pick<IPost, 'description' | 'likes' | 'commentsIds' | 'likedUserIds'>>;

type RemovePostArg = Pick<IUser, 'password'>;

type AddPostResponse = Pick<IPost, 'id' | 'userId' | 'description' | 'createdAt' | 'likes'>;

interface IAddPostProps {
  arg: AddPostArg;
}

interface IUpdatePostProps {
  arg: UpdatePostArg;
}

interface IRemovePostProps {
  arg: RemovePostArg;
}

export type {
  IAddPostProps,
  IUpdatePostProps,
  IRemovePostProps,
  AddPostResponse,
  AddPostArg,
  UpdatePostArg,
  RemovePostArg,
};
