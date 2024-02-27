import { PER_PAGE } from '../lib/constants';
import { useJobItemsContext } from '../lib/hooks';
import JobList from './JobList';
import PaginationControls from './PaginationControls';
import ResultsCount from './ResultsCount';
import SortingControls from './SortingControls';

export default function Sidebar() {
  
  const { spinner, error, jobs, totalNumberOfResults } = useJobItemsContext();

  return (
    <div className='sidebar'>
      <div className='sidebar__top'>
        <ResultsCount totalNumberOfResults={totalNumberOfResults} />
        <SortingControls />
      </div>
      <JobList spinner={spinner} err={error as Error | null} jobs={jobs} />
      <PaginationControls totalPages={totalNumberOfResults / PER_PAGE}/>
    </div>
  );
}
