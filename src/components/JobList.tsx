import { AxiosError } from 'axios';
import JobListItem from './JobListItem';
import { Job } from '../lib/types';
import Spinner from './Spinner';
import toast from 'react-hot-toast';
import { useJobItemStore } from '../stores/JobItemStore';

type JobListProps = {
  spinner: boolean;
  err: Error | null;
};

export function JobList({ spinner, err }: JobListProps) {
  const jobItems = useJobItemStore((state) => state.getSortedAndSlicedJobItems());
  

  return (
    <ul className='job-list'>
      {spinner && <Spinner />}
      {err && toast((err as AxiosError).message)}
      {jobItems.map((job: Job) => (
        <JobListItem key={job.id} job={job} />
      ))}
    </ul>
  );
}

export default JobList;
