import { ResponseError } from '../types/common';

export const fetcher = <Data>(url: string): Promise<Data> =>
  fetch(url).then((res) => {
    if (!res.ok) {
      const error: ResponseError = new Error('An error occurred while fetching the data.');
      error.status = res.status;
      throw error;
    }
    return res.json() as Data;
  });
