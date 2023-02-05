const API_BASE_URL = 'http://localhost:3000/api';

const KEY_LOCAL_STORAGE = 'rs-clone-krevetka87-altsep-metalknock';

const enum ApiPath {
  posts = '/posts',
  users = '/users',
  comments = 'comments',
  auth = '/posts-auth',
}

const enum ReducerNames {
  inputs = 'inputs',
}

const enum Locales {
  en = 'en-EN',
  ru = 'ru-RU',
  cn = 'cn-CN',
}

export { API_BASE_URL, KEY_LOCAL_STORAGE, ApiPath, ReducerNames, Locales };
