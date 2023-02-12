import { IUser } from '../types/data';
import { IAddUserProps, IUpdateUserProps, IHideUserProps } from '../types/usersApi';

const addUser = async (url: string, { arg }: IAddUserProps): Promise<void> => {
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  });
};

const updateUser = async (url: string, { arg }: IUpdateUserProps): Promise<IUser> => {
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  });
  return (await response.json()) as IUser;
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

export { addUser, updateUser, hideUser };
