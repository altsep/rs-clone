import { IPost } from '../types/data';
import { IAddPostProps, IUpdatePostProps } from '../types/postsApi';

const addPost = async (url: string, { arg }: IAddPostProps): Promise<IPost> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  });
  return (await response.json()) as IPost;
};

const updatePost = async (url: string, { arg }: IUpdatePostProps): Promise<IPost> => {
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  });
  return (await response.json()) as IPost;
};

const removePost = async (url: string): Promise<void> => {
  await fetch(url, {
    method: 'DELETE',
  });
};

export { addPost, updatePost, removePost };
