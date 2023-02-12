import { IComment } from './data';

type AddCommentArg = Pick<IComment, 'userId' | 'postId' | 'description'>;

type UpdateCommentArg = Partial<Pick<IComment, 'description' | 'likes' | 'likedUserIds'>>;

interface IAddCommentProps {
  arg: AddCommentArg;
}

interface IUpdateCommentProps {
  arg: UpdateCommentArg;
}

export type { IAddCommentProps, IUpdateCommentProps, AddCommentArg, UpdateCommentArg };
