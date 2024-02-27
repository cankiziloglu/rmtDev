export type Job = {
  id: number;
  title: string;
  badgeLetters: string;
  company: string;
  relevanceScore: number;
  daysAgo: number;
};

export type JobItem = Job & {
  description: string;
  qualifications: string[];
  reviews: string[];
  location: string;
  duration: string;
  salary: string;
  companyURL: string;
  coverImgURL: string;
  badgeBgColor: string;
};
