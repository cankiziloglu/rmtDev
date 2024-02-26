import { create } from 'zustand';
import { Job } from '../lib/types';
import { PER_PAGE } from '../lib/constants';

type TJobItemStore = {
  searchText: string;
  jobItems: Job[];
  setJobItems: (jobItems: Job[]) => void;
  sortBy: string;
  sortJobItems: (jobItems: Job[], sortBy: string) => Job[];
  getSortedJobItems: () => Job[];
  page: number;
  getTotalPages: () => number;
  getSortedAndSlicedJobItems: () => Job[];
};

// const sortJobItems = (jobItems: Job[], sortBy: string) => {
//   if (sortBy === 'relevant')
//     return [...jobItems].sort((a, b) => b.relevanceScore - a.relevanceScore);
//   if (sortBy === 'recent')
//     return [...jobItems].sort((a, b) => a.daysAgo - b.daysAgo);
//   return jobItems;
// }

export const useJobItemStore = create<TJobItemStore>((set, get) => ({
  searchText: '',
  jobItems: [],
  setJobItems: (jobItems: Job[]) => set({ jobItems }),
  sortBy: 'relevant',
  sortJobItems: (jobItems: Job[], sortBy: string) => {
    if (sortBy === 'relevant')
      return [...jobItems].sort((a, b) => b.relevanceScore - a.relevanceScore);
    if (sortBy === 'recent')
      return [...jobItems].sort((a, b) => a.daysAgo - b.daysAgo);
    return jobItems;
  },
  getSortedJobItems: () => get().sortJobItems(get().jobItems, get().sortBy),
  page: 1,
  getTotalPages: () => (get().getSortedJobItems().length / PER_PAGE),
  getSortedAndSlicedJobItems: () => get().getSortedJobItems().slice(
    (get().page - 1) * PER_PAGE,
    get().page * PER_PAGE
  ),
}));
