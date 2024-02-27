import { createContext } from 'react';
import { useJobId } from '../lib/hooks';

type JobIdContextType = {
  jobId: number | null;
};

export const JobIdContext = createContext<JobIdContextType | null>(null);

export default function JobIdContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const jobId = useJobId();

  return (
    <JobIdContext.Provider
      value={{
        jobId,
      }}
    >
      {children}
    </JobIdContext.Provider>
  );
}
