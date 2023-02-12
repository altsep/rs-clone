const API_BASE_URL = 'http://localhost:3000/api';

const KEY_LOCAL_STORAGE = 'rs-clone-krevetka87-altsep-metalknock';

const enum ApiPath {
  posts = '/posts',
  users = '/users',
  comments = '/comments',
  auth = '/posts-auth',
}

const enum RoutePath {
  registration = '/registration',
  messages = '/messages',
  friends = '/friends',
  settings = '/settings',
}

const enum ReducerNames {
  inputs = 'inputs',
  leftSideBar = 'leftSideBar',
  users = 'users',
  posts = 'posts',
}

const enum Locales {
  en = 'en-EN',
  ru = 'ru-RU',
  cn = 'zh-CN',
}

const enum VariantsMoreMenu {
  default = 'default',
  withoutEdit = 'withoutEdit',
}

const enum LSKeys {
  theme = 'theme',
  token = 'token',
}

const locales: { [key: string]: string } = {
  en: 'MM/DD/YYYY',
  ru: 'DD.MM.YYYY',
  es: 'DD/MM/YYYY',
};

const themes = ['light', 'dark'];

export { API_BASE_URL, KEY_LOCAL_STORAGE, ApiPath, ReducerNames, Locales, VariantsMoreMenu, locales, themes, LSKeys };
