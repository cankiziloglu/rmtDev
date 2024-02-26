import axios from 'axios';
import { API_URL } from './constants';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export function useGetJobs(searchText: string) {
  const { isLoading, data, error } = useQuery({
    queryKey: ['jobs', searchText],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}?search='${searchText}'`);
      return data.jobItems;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: false,
    enabled: !!searchText,
  });

  return { isLoading, data, error };
}

export function useDebounce<T>(value: T, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
