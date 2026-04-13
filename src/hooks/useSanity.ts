"use client";
import { useState, useEffect, useCallback } from "react";

interface UseSanityResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useSanityQuery<T>(
  queryFn: () => Promise<T>,
  deps: unknown[] = []
): UseSanityResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(() => {
    setLoading(true);
    setError(null);
    queryFn()
      .then((result) => setData(result))
      .catch((err) => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    execute();
  }, [execute]);

  return { data, loading, error, refetch: execute };
}
