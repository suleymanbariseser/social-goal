import { z } from 'zod';

export const followUserSchema = z.object({
  userId: z.number({
    required_error: 'User id is required',
  }),
});

export type FollowUserInput = z.infer<typeof followUserSchema>;