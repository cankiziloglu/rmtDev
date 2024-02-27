import { createContext, useMemo, useState } from 'react';
import { useDebounce, useGetJobs } from '../lib/hooks';
import { Job } from '../lib/types';
import { PER_PAGE } from '../lib/constants';

type JobItemsContextType = {
  searchText: string;
  setSearchText: (searchText: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  page: number;
  setPage: (page: number) => void;
  spinner: boolean;
  error: Error | null;
  jobs: Job[];
  totalNumberOfResults: number;
};

export const JobItemsContext = createContext<JobItemsContextType | null>(null);

export default function JobItemsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState('relevant');
  const [page, setPage] = useState(1);

  const debouncedSearchText = useDebounce(searchText);
  const { isLoading, data, error } = useGetJobs(debouncedSearchText);

  const sortJobItems = (jobItems: Job[], sortBy: string) => {
    if (sortBy === 'relevant')
      return [...jobItems].sort((a, b) => b.relevanceScore - a.relevanceScore);
    if (sortBy === 'recent')
      return [...jobItems].sort((a, b) => a.daysAgo - b.daysAgo);
    return jobItems;
  };

  let jobItems = data;

  if (!jobItems) jobItems = [];

  const jobs = useMemo(() => sortJobItems(jobItems, sortBy).slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  ), [jobItems, sortBy, page]);

  const spinner = isLoading && Boolean(debouncedSearchText);
  const totalNumberOfResults = jobItems.length || 0;

  return (
    <JobItemsContext.Provider
      value={{
        searchText,
        setSearchText,
        sortBy,
        setSortBy,
        page,
        setPage,
        spinner,
        error: error as Error | null,
        jobs,
        totalNumberOfResults,
      }}
    >
      {children}
    </JobItemsContext.Provider>
  );
}
