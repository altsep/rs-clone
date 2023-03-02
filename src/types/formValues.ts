interface IFormValues {
  email: string;
  password: string;
  name: string;
  passwordConfirm: string;
  country: string;
  birthDate: string;
}

interface IEditFormValues {
  email: string;
  password: string;
  name: string;
  country: string;
  birthDate: string | null;
  alias: string;
}

type TLoginValues = Pick<IFormValues, 'email' | 'password'>;

export type { IFormValues, TLoginValues, IEditFormValues };
