
import JobListItem from './JobListItem';
import { Job } from '../lib/types';
import Spinner from './Spinner';


type JobListProps = {
  spinner: boolean;
  jobs: Job[];
};

export function JobList({ spinner, jobs }: JobListProps) {

  return (
    <ul className='job-list'>
      {spinner && <Spinner />}
      {jobs.map((job: Job) => (
        <JobListItem key={job.id} job={job} />
      ))}
    </ul>
  );
}

export default JobList;
