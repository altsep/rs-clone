import { IAddCommentProps, IUpdateCommentProps } from '../types/commentsApi';
import { IComment } from '../types/data';

const addComment = async (url: string, { arg }: IAddCommentProps): Promise<IComment> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  });
  return (await response.json()) as IComment;
};

const updateComment = async (url: string, { arg }: IUpdateCommentProps): Promise<IComment> => {
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  });
  return (await response.json()) as IComment;
};

const removeComment = async (url: string): Promise<void> => {
  await fetch(url, {
    method: 'DELETE',
  });
};

export { addComment, updateComment, removeComment };
