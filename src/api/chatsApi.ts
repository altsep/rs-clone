import { IAddChatProps } from '../types/chatsApi';

const addChat = async (url: string, { arg }: IAddChatProps): Promise<unknown> => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  });
  return response.json();
};

export { addChat };
