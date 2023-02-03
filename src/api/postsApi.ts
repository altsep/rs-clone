import { AddPostProps, UpdatePostProps, RemovePostProps } from '../types/postsApi';

const addPost = async (url: string, { arg }: AddPostProps): Promise<void> => {
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  });
};

const updatePost = async (url: string, { arg }: UpdatePostProps): Promise<void> => {
  await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  });
};

const removePost = async (url: string, { arg }: RemovePostProps): Promise<void> => {
  await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  });
};

export { addPost, updatePost, removePost };
