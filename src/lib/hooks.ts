import axios from 'axios';
import { API_URL } from './constants';
import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { JobItemsContext } from '../contexts/JobItemsContext';
import { JobIdContext } from '../contexts/JobIdContext';

export function useGetJobs(searchText: string) {
  const { isLoading, data, error } = useQuery({
    queryKey: ['jobs', searchText],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}?search='${searchText}'`);
      return data.jobItems;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: false,
    enabled: !!searchText,
  });

  return { isLoading, data, error };
}

export function useGetJobItem(jobId: number) {
  const { isLoading, data, error } = useQuery({
    queryKey: ['job-item', jobId],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/${jobId}`);
      return data.jobItem;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: false,
    enabled: !!jobId,
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

export function useJobId() {
  const [jobId, setJobId] = useState<number | null>(null);
  useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.slice(1);
      setJobId(id);
    };
    handleHashChange();

    window.addEventListener('hashchange',handleHashChange);
    return () => {
      window.removeEventListener('hashchange', () =>handleHashChange);
    };
  }, []);
  return jobId;
}

export function useJobItemsContext() {
  const context = useContext(JobItemsContext);
  if (!context) {
    throw new Error('useJobItemsContext must be used within a JobItemsContextProvider');
  }
  return context;
}

export function useJobIdContext() {
  const context = useContext(JobIdContext);
  if (!context) {
    throw new Error('useJobIdContext must be used within a JobIdContextProvider');
  }
  return context;
}
