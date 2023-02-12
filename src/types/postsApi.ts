import { IPost } from './data';

type AddPostArg = Pick<IPost, 'userId' | 'description'>;

type UpdatePostArg = Partial<Pick<IPost, 'description' | 'likes' | 'commentsIds' | 'likedUserIds'>>;

interface IAddPostProps {
  arg: AddPostArg;
}

interface IUpdatePostProps {
  arg: UpdatePostArg;
}

export type { IAddPostProps, IUpdatePostProps, AddPostArg, UpdatePostArg };
