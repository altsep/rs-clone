import { useEffect, useState } from 'react';
import useSWR, { Key } from 'swr';
import { fetcher } from '../utils/fetcher';

const useFetch = <Data,>(
  key: Key
): {
  data: Data | undefined;
  error: Error | undefined;
  loading: boolean;
} => {
  const { data, error } = useSWR<Data, Error>(key, fetcher<Data>);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
  }, [data, error]);

  return {
    data,
    error,
    loading,
  };
};

export { useFetch };
