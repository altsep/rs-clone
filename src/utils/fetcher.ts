export const fetcher = <Data>(url: string): Promise<Data> => fetch(url).then((res) => res.json() as Data);
