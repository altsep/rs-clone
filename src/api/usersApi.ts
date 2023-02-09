import { IAddUserProps, IUpdateUserProps, IHideUserProps, ILoginUser } from '../types/usersApi';
import { ILogin } from '../types/data';

const addUser = async (url: string, { arg }: IAddUserProps): Promise<void> => {
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  });
};

const updateUser = async (url: string, { arg }: IUpdateUserProps): Promise<void> => {
  await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  });
};

const hideUser = async (url: string, { arg }: IHideUserProps): Promise<void> => {
  await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  });
};

const loginUser = async (url: string, { arg }: ILoginUser): Promise<Response> => {
  const res: Response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  });
  return res;
};

export { addUser, updateUser, hideUser, loginUser };
