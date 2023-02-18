import { IPost } from './data';

type TAddPostArg = Pick<IPost, 'userId' | 'description'>;

type TUpdatePostArg = Partial<Pick<IPost, 'description' | 'likes' | 'commentsIds' | 'likedUserIds'>>;

interface IAddPostProps {
  arg: TAddPostArg;
}

interface IUpdatePostProps {
  arg: TUpdatePostArg;
}

export type { IAddPostProps, IUpdatePostProps, TAddPostArg, TUpdatePostArg };
