interface AddUserArg {
  name: string;
  email: string;
  password: string;
  country: string;
  birthDate: string;
  createdAt: string;
  alias: string;
}

interface UpdateUserArg {
  name?: string;
  email?: string;
  password?: string;
  country?: string;
  birthDate?: string;
  alias?: string;
  avatarURL?: string;
  postsIds?: number[];
  friendsIds?: number[];
}

interface HideUserArg {
  password: string;
}

interface AddUserProps {
  arg: AddUserArg;
}
interface UpdateUserProps {
  arg: UpdateUserArg;
}
interface HideUserProps {
  arg: HideUserArg;
}

export type { AddUserArg, UpdateUserArg, HideUserArg, AddUserProps, UpdateUserProps, HideUserProps };
