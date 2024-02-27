import { AxiosError } from 'axios';
import JobListItem from './JobListItem';
import { Job } from '../lib/types';
import Spinner from './Spinner';
import toast from 'react-hot-toast';

type JobListProps = {
  spinner: boolean;
  err: Error | null;
  jobs: Job[];
};

export function JobList({ spinner, err, jobs }: JobListProps) {

  return (
    <ul className='job-list'>
      {spinner && <Spinner />}
      {err && toast((err as AxiosError).message)}
      {jobs.map((job: Job) => (
        <JobListItem key={job.id} job={job} />
      ))}
    </ul>
  );
}

export default JobList;
