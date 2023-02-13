import { IComment } from './data';

type TAddCommentArg = Pick<IComment, 'userId' | 'postId' | 'description'>;

type TUpdateCommentArg = Partial<Pick<IComment, 'description' | 'likes' | 'likedUserIds'>>;

interface IAddCommentProps {
  arg: TAddCommentArg;
}

interface IUpdateCommentProps {
  arg: TUpdateCommentArg;
}

export type { IAddCommentProps, IUpdateCommentProps, TAddCommentArg, TUpdateCommentArg };
