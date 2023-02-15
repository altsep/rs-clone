import { IPost } from '../types/data';
import { IAddPostProps, IUpdatePostProps, IRemovePostProps } from '../types/postsApi';

const addPost = async (url: string, { arg }: IAddPostProps): Promise<IPost> => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
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
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  });
  return (await response.json()) as IPost;
};

const removePost = async (url: string, { arg }: IRemovePostProps): Promise<void> => {
  await fetch(url, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  });
};

export { addPost, updatePost, removePost };
