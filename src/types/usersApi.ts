import { IUser } from './data';
import { IEditFormValues, IFormValues, TLoginValues } from './formValues';

type TAddUserArg = Pick<IUser, 'name' | 'email' | 'password' | 'country' | 'birthDate' | 'createdAt' | 'alias'>;

type TUpdateUserArg = Partial<
  Pick<
    IUser,
    | 'name'
    | 'email'
    | 'password'
    | 'country'
    | 'birthDate'
    | 'alias'
    | 'postsIds'
    | 'friendsIds'
    | 'pendingFriendsIds'
    | 'hidden'
    | 'images'
  >
>;

type THideUserArg = Pick<IUser, 'password'>;

interface IAddUserProps {
  arg: TAddUserArg;
}

interface IUpdateUserProps {
  arg: TUpdateUserArg;
}

interface IEditUserProps {
  arg: Partial<IEditFormValues>;
}

interface IHideUserProps {
  arg: THideUserArg;
}

interface ILoginUser {
  arg: TLoginValues;
}

interface IRegistrationUser {
  arg: Omit<IFormValues, 'passwordConfirm'>;
}

interface IChangePassword {
  arg: {
    userId: number;
    password: string;
  };
}

export type {
  TAddUserArg,
  TUpdateUserArg,
  THideUserArg,
  IAddUserProps,
  IUpdateUserProps,
  IHideUserProps,
  ILoginUser,
  IRegistrationUser,
  IEditUserProps,
  IChangePassword,
};
