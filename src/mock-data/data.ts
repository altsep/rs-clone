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
// const idAuthorizedUser = 1;

// const authorizedUser = {
//   id: 1,
//   email: 'qweqwe@example.com',
//   password: '$2b$05$.vdmlSFFUePlDMmeFKxKIO7gB1okkF2YV9femQ6GjmBWSYriYgvs6',
//   name: 'Mr QWE',
//   alias: 'qweshka',
//   country: 'Iceland',
//   birthDate: '2013-02-09T03:46:18.057Z',
//   hidden: true,
//   createdAt: '2023-02-09T03:46:18.057Z',
//   postsIds: [],
//   friendsIds: [2, 3, 7, 8, 9],
//   // activationLink: '956bb135-ed5a-494b-8d0f-a8dcabad4bb3',
//   // isActivated: false,
// };

const currentLocales = Locales.en;

export { idAuthorizedUser, currentLocales, authorizedUser };
