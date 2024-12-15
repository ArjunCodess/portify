import { InferSelectModel } from 'drizzle-orm';
import { projects } from '@/db/schema';

export type Project = InferSelectModel<typeof projects> & {
  serialNumber?: number;
};