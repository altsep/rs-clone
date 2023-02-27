import { LSKeys, KEY_LOCAL_STORAGE } from '../constants';

const accessTokenItemKey = `${LSKeys.token}_${KEY_LOCAL_STORAGE}`;

const getFirstLetter = (str: string): string => str.slice(0, 1);
const setToken = (value: string): void => localStorage.setItem(accessTokenItemKey, value);
const removeToken = (): void => localStorage.removeItem(accessTokenItemKey);
const getToken = (): string | null => localStorage.getItem(accessTokenItemKey);
const getActionString = (type: string, payload: unknown): string => JSON.stringify({ type, payload });
const getHexStr = (n = 32) => Array.from({ length: n }, () => Math.round(Math.random() * 0x10).toString(16)).join('');

export { getFirstLetter, setToken, removeToken, getToken, getActionString, getHexStr };
