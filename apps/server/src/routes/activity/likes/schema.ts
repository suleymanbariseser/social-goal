import { z } from 'zod';

export const likeByIdSchema = z.object({
  id: z.number({
    required_error: 'Activity ID is required',
  }),
});

export const unlikeActivityByIdSchema = z.object({
  id: z.number({
    required_error: 'Activity ID is required',
  }),
});

export type LikeByIdInput = z.infer<typeof likeByIdSchema>;
export type UnlikeByIdInput = z.infer<typeof unlikeActivityByIdSchema>;
