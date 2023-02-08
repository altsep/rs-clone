interface IFormValues {
  email: string;
  password: string;
  name: string;
  passwordConfirm: string;
  country: string;
  birthDate: string;
}

type TLoginValues = Pick<IFormValues, 'email' | 'password'>;

export type { IFormValues, TLoginValues };
