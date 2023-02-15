import { LSKeys, KEY_LOCAL_STORAGE } from '../constants';

const getFirstLetter = (str: string): string => str.slice(0, 1);
const setToken = (value: string): void => localStorage.setItem(`${LSKeys.token}_${KEY_LOCAL_STORAGE}`, value);
const removeToken = (): void => localStorage.removeItem(`${LSKeys.token}_${KEY_LOCAL_STORAGE}`);

export { getFirstLetter, setToken, removeToken };
