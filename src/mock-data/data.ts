import { Locales } from '../constants';

const idAuthorizedUser = 1;

const authorizedUser = {
  id: 1,
  email: 'test@example.com',
  name: 'Clark',
  password: '',
  alias: 'santa661',
  hidden: false,
  country: 'Antarctica',
  birthDate: '1955-11-11T21:00:00.000Z',
  createdAt: '2023-02-02T03:04:59.717Z',
  postsIds: [1],
};

const currentLocales = Locales.en;

export { idAuthorizedUser, currentLocales, authorizedUser };
