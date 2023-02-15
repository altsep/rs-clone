import { IUser } from './data';
import { IFormValues, TLoginValues } from './formValues';

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
    | 'avatarURL'
    | 'postsIds'
    | 'friendsIds'
    | 'pendingFriendsIds'
  >
>;

type THideUserArg = Pick<IUser, 'password'>;

interface IAddUserProps {
  arg: TAddUserArg;
}

interface IUpdateUserProps {
  arg: TUpdateUserArg;
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

export type {
  TAddUserArg,
  TUpdateUserArg,
  THideUserArg,
  IAddUserProps,
  IUpdateUserProps,
  IHideUserProps,
  ILoginUser,
  IRegistrationUser,
};
