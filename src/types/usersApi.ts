interface AddUserProps {
  arg: {
    name: string;
    email: string;
    password: string;
    country: string;
    birthDate: string;
    createdAt: string;
    alias: string;
  };
}

interface UpdateUserProps {
  arg: {
    name?: string;
    email?: string;
    password?: string;
    country?: string;
    birthDate?: string;
    alias?: string;
    avatarURL?: string;
    postsIds?: number[];
    friendsIds?: number[];
  };
}
interface HideUserProps {
  arg: {
    password: string;
  };
}

export type { AddUserProps, UpdateUserProps, HideUserProps };
