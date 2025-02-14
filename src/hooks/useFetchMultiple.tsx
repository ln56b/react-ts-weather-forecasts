import { useEffect, useState } from "react";

function useFetchMultiple<T>(urls: string[]) {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!urls?.length) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const results = await Promise.all(
          urls.map(async (url) => {
            const response = await fetch(url);
            if (!response.ok) {
              return { error: { message: response.statusText } };
            }
            return response.json();
          })
        );

        setData(results);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [urls]);
  return { data, loading, error };
}

export default useFetchMultiple;
