import { IPost, IUser } from './data';

type AddPostArg = Pick<IPost, 'userId' | 'description' | 'createdAt'>;

type UpdatePostArg = Partial<Pick<IPost, 'description' | 'likes' | 'commentsIds'>>;

type RemovePostArg = Pick<IUser, 'password'>;

interface IAddPostProps {
  arg: AddPostArg;
}

interface IUpdatePostProps {
  arg: UpdatePostArg;
}

interface IRemovePostProps {
  arg: RemovePostArg;
}

export type { IAddPostProps, IUpdatePostProps, IRemovePostProps, AddPostArg, UpdatePostArg, RemovePostArg };
