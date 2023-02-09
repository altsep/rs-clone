import { IAddPostProps, IUpdatePostProps, IRemovePostProps } from '../types/postsApi';

const addPost = async (url: string, { arg }: IAddPostProps): Promise<unknown> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  });
  const responseData: unknown = await response.json();

  return responseData;
};

const updatePost = async (url: string, { arg }: IUpdatePostProps): Promise<void> => {
  await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  });
};

const removePost = async (url: string, { arg }: IRemovePostProps): Promise<void> => {
  await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  });
};

export { addPost, updatePost, removePost };
