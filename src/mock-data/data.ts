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

// const idAuthorizedUser = 2;

// const authorizedUser = {
//   id: 2,
//   email: '2@example.com',
//   name: 'tttty',
//   password: '',
//   alias: '',
//   hidden: false,
//   country: '',
//   birthDate: '',
//   createdAt: '',
// };

// const idAuthorizedUser = 3;

// const authorizedUser = {
//   id: 3,
//   email: 'hu@example.com',
//   name: 'h1dd3nUs3r99',
//   password: '1',
//   alias: '',
//   hidden: true,
//   country: '',
//   birthDate: '',
//   createdAt: '',
// };

const currentLocales = Locales.en;

export { idAuthorizedUser, currentLocales, authorizedUser };
