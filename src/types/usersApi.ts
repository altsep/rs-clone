import { IUser } from './data';

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

export type { TAddUserArg, TUpdateUserArg, THideUserArg, IAddUserProps, IUpdateUserProps, IHideUserProps };
