import { recentSearchEnum } from '@/config/db/schema';
import { z } from 'zod';

const textSearchSchema = z.object({
  type: z.literal('text'),
  text: z.string(),
});

const goalSearchSchema = z.object({
  type: z.literal('goal'),
  goalId: z.number(),
});

const userSearchSchema = z.object({
  type: z.literal('user'),
  userId: z.number(),
});

export const addSearchSchema = z.union([textSearchSchema, goalSearchSchema, userSearchSchema]);

export type AddSearchSchema = z.infer<typeof addSearchSchema>;

export const deleteSearchSchema = z.object({
  id: z.number(),
});

export type DeleteSearchSchema = z.infer<typeof deleteSearchSchema>;
