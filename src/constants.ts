const API_BASE_URL = 'http://localhost:3000/api';

const enum ApiPath {
  posts = '/posts',
  users = '/users',
  comments = 'comments',
  auth = '/posts-auth',
}

const datesFormat: { [key: string]: string } = {
  en: 'MM/DD/YYYY',
  ru: 'DD/MM/YYYY',
  es: 'DD/MM/YYYY',
};

export { API_BASE_URL, ApiPath, datesFormat };
