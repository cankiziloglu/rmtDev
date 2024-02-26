import { useDebounce, useGetJobs } from '../lib/hooks';
import { useJobItemStore } from '../stores/JobItemStore';
import JobList from './JobList';
import PaginationControls from './PaginationControls';
import ResultsCount from './ResultsCount';
import SortingControls from './SortingControls';

export default function Sidebar() {
  const searchText = useJobItemStore((state) => state.searchText);
  const setJobItems = useJobItemStore((state) => state.setJobItems);
  const debouncedSearchText = useDebounce(searchText);
  const { isLoading, data, error } = useGetJobs(debouncedSearchText);
  setJobItems(data || []);

  const spinner = isLoading && Boolean(searchText);
  const totalNumberOfResults = data?.length || 0;

  return (
    <div className='sidebar'>
      <div className='sidebar__top'>
        <ResultsCount totalNumberOfResults={totalNumberOfResults} />
        <SortingControls />
      </div>
      <JobList spinner={spinner} err={error as Error | null} />
      <PaginationControls />
    </div>
  );
}
