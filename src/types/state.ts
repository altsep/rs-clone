type InputsState = {
  valueCreatePost: string;
};

type TThemeState = {
  mode: string;
};

type TAuthState = {
  auth: boolean;
};

type TLoginFormState = {
  passwordVisible: boolean;
  loginError: string;
};

export type { InputsState, TThemeState, TAuthState, TLoginFormState };
