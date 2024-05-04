import { infiniteSchema } from '@/utils/infinity';
import { z } from 'zod';

export const profileSummarySchema = z.object({
  id: z.number({ required_error: 'Id is required' }),
});

export const usersListSchema = infiniteSchema({
  q: z.string().nullish(),
});

export type ProfileSummaryInput = z.infer<typeof profileSummarySchema>;
export type UsersListInput = z.infer<typeof usersListSchema>;
