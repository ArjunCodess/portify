import { InferSelectModel } from 'drizzle-orm';
import { projects } from '@/db/schema';

export type ProjectWithSerialNumber = InferSelectModel<typeof projects> & {
  serialNumber?: number;
};

export type Project = {
  id: string;
  name: string;
  description: string | null;
  link: string | null;
  github: string | null;
  userId: string;
  logo: string | null;
  banner: string | null;
  category: string | null;
  order: number | null;
  clickCount: number | null;
};

export type UserData = {
  id: string;
  name: string;
  email: string;
  username: string;
  tagline: string | null;
  bio: string | null;
  twitter: string | null;
  github: string | null;
  link: string | null;
  location: string | null;
  profilePicture: string | null;
  projects: Project[];
  skills: string[] | null;
  theme: string;
  visitCount: number;
};

export type AnalyticsData = {
  profileVisits: {
    date: string;
    count: number;
  }[];
  projectClicks: {
    projectId: string;
    projectName: string;
    date: string;
    count: number;
  }[];
}