import { useState, useEffect, useCallback } from 'react';

const useApi = (apiFn, immediate = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiFn(...args);
        setData(response.data);
        return response.data;
      } catch (err) {
        setError(err.message || 'Something went wrong');
        return null;
      } finally {
        setLoading(false);
      }
    },
    [apiFn]
  );

  useEffect(() => {
    if (immediate) execute();
  }, []);

  return { data, loading, error, execute, setData };
};

export default useApi;