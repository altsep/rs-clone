import {
  IAddUserProps,
  IUpdateUserProps,
  IHideUserProps,
  ILoginUser,
  IRegistrationUser,
  IEditUserProps,
  IChangePassword,
} from '../types/usersApi';
import { IUser } from '../types/data';

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
    credentials: 'include',
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

const loginUser = async (url: string, { arg }: ILoginUser): Promise<Response> => {
  const res: Response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  });
  return res;
};

const logoutUser = async (url: string): Promise<Response> => {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res;
};

const registerUser = async (url: string, { arg }: IRegistrationUser): Promise<Response> => {
  const res: Response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(arg),
  });
  return res;
};

const refreshToken = async (url: string): Promise<Response> => {
  const res: Response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
  });
  return res;
};

const editUser = async (url: string, { arg }: IEditUserProps): Promise<Response> => {
  const response = await fetch(url, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  });
  return response;
};

const changePassword = async (url: string, { arg }: IChangePassword): Promise<Response> => {
  const response = await fetch(url, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  });
  return response;
};

const deleteUser = async (id: number, url: string, data: Pick<IUser, 'password'>) => {
  const res = await fetch(url, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return res;
};

export {
  addUser,
  updateUser,
  hideUser,
  loginUser,
  registerUser,
  refreshToken,
  logoutUser,
  editUser,
  changePassword,
  deleteUser,
};
