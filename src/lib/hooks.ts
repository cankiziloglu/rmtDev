import axios from 'axios';
import { API_URL } from './constants';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { JobItemsContext } from '../contexts/JobItemsContext';
import { JobIdContext } from '../contexts/JobIdContext';
import { BookmarksContext } from '../contexts/BookmarksContext';
import { handleError } from './utils';

export function useGetJobs(searchText: string) {
  const { isLoading, data } = useQuery({
    queryKey: ['jobs', searchText],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}?search='${searchText}'`);
      return data.jobItems;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: false,
    enabled: !!searchText,
    onError: handleError,
  });

  return { isLoading, data };
}

export function useGetJobItem(jobId: number) {
  const { isLoading, data } = useQuery({
    queryKey: ['job-item', jobId],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/${jobId}`);
      return data.jobItem;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: false,
    enabled: !!jobId,
    onError: handleError,
  });

  return { isLoading, data };
}

export function useGetBookmarks(ids: number[]) {
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ['job-item', id],
      queryFn: async () => {
        const { data } = await axios.get(`${API_URL}/${id}`);
        return data.jobItem;
      },
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60, // 1 hour
      retry: false,
      enabled: !!id,
      onError: handleError,
    })),
  });
  const bookmarkedJobItems = results
    .map((result) => result.data)
    .filter((result) => !!result);
  const isLoading = results.some((result) => result.isLoading);
  return { isLoading, bookmarkedJobItems };
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

export function useJobId() {
  const [jobId, setJobId] = useState<number | null>(null);
  useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.slice(1);
      setJobId(id);
    };
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', () => handleHashChange);
    };
  }, []);
  return jobId;
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [value, setValue] = useState(() =>
    JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue))
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

export function useOnClickOutside(
  refs: React.RefObject<HTMLElement>[],
  handler: () => void
) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (refs.every((ref) => !ref.current?.contains(e.target as Node))) {
        handler();
      }
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [refs, handler]);
}

export function useJobItemsContext() {
  const context = useContext(JobItemsContext);
  if (!context) {
    throw new Error(
      'useJobItemsContext must be used within a JobItemsContextProvider'
    );
  }
  return context;
}

export function useJobIdContext() {
  const context = useContext(JobIdContext);
  if (!context) {
    throw new Error(
      'useJobIdContext must be used within a JobIdContextProvider'
    );
  }
  return context;
}

export function useBookmarksContext() {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error(
      'useBookmarksContext must be used within a BookmarksContextProvider'
    );
  }
  return context;
}
