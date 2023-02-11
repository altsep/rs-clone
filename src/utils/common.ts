import { LSKeys, KEY_LOCAL_STORAGE } from '../constants';

const getFirstLetter = (str: string): string => str.slice(0, 1);
const setToken = (value: string) => localStorage.setItem(`${LSKeys.token}_${KEY_LOCAL_STORAGE}`, value);

export { getFirstLetter, setToken };
