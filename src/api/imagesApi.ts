import { ISendImage } from '../types/imagesApi';

const sendImage = async (url: string, { arg }: ISendImage): Promise<Response> => {
  const res: Response = await fetch(url, {
    credentials: 'include',
    method: 'POST',
    body: arg,
  });
  return res;
};

const getImage = async (url: string): Promise<string> => {
  const res: Response = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  });
  if (!res.ok) {
    return '';
  }
  const avatar = await res.text();
  return avatar;
};

const getPostImages = async (url: string): Promise<string[]> => {
  const res: Response = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  });
  if (!res.ok) {
    return [];
  }
  const data = (await res.json()) as string[];
  return data;
};

const sendPostImage = async (url: string, formData: FormData): Promise<Response> => {
  const res: Response = await fetch(url, {
    credentials: 'include',
    method: 'POST',
    body: formData,
  });
  return res;
};

export { sendImage, getImage, getPostImages, sendPostImage };
