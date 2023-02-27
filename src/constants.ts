const API_BASE_URL = process.env.API_BASE_URL || '/api';
const WS_BASE_URL =
  process.env.WS_BASE_URL || window.location.hostname === 'localhost'
    ? 'ws://localhost:3000'
    : `wss://${window.location.host}`;

const KEY_LOCAL_STORAGE = 'rs-clone-krevetka87-altsep-metalknock';

const INIT_MESSAGE = KEY_LOCAL_STORAGE;

const enum ApiPath {
  posts = '/posts',
  users = '/users',
  comments = '/comments',
  auth = '/posts-auth',
  refresh = '/refresh',
  login = '/login',
  logout = '/logout',
  registration = '/registration',
  chats = '/chats',
  password = '/users-pwd',
  images = '/images',
}

const enum RoutePath {
  registration = '/registration',
  messages = '/messages',
  friends = '/friends',
  settings = '/settings',
  language = 'language',
  editProfile = 'edit-profile',
  theme = 'theme',
  security = 'security',
  notFound = '/404/404',
}

const enum ReducerNames {
  inputs = 'inputs',
  leftSideBar = 'leftSideBar',
  users = 'users',
  posts = 'posts',
  comments = 'comments',
  theme = 'theme',
  language = 'language',
  auth = 'auth',
  chats = 'chats',
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
  path = 'path',
  locale = 'i18nextLng',
  firstUnreadMessagesOfChats = 'firstUnreadMessagesOfChats',
  lastMessages = 'lastMessages',
}

const locales: { [key: string]: string } = {
  en: 'MM/DD/YYYY',
  ru: 'DD.MM.YYYY',
  es: 'DD/MM/YYYY',
};

const themes = ['light', 'dark'];

export {
  WS_BASE_URL,
  API_BASE_URL,
  KEY_LOCAL_STORAGE,
  INIT_MESSAGE,
  ApiPath,
  ReducerNames,
  Locales,
  VariantsMoreMenu,
  locales,
  themes,
  LSKeys,
  RoutePath,
};
