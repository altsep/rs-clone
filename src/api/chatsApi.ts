import { IAddChatProps } from '../types/chatsApi';

const addChat = async (url: string, { arg }: IAddChatProps): Promise<Response> => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  });
  return response;
};

export { addChat };
