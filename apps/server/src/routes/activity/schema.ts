import { z } from 'zod';

export const createActivitySchema = z.object({
  goalId: z.number({
    required_error: 'Goal ID is required',
  }),
  content: z
    .string({
      required_error: 'Content is required',
    })
    .min(1, { message: 'Content must be at least 1 character' })
    .max(256, {
      message: 'Content must be less than 256 characters',
    }),
});

export const activityInfiniteSchema = z.object({
  limit: z
    .number()
    .min(1, {
      message: 'Limit must be at least 1',
    })
    .nullish(),
  cursor: z.number().nullish(),
  timestamp: z.date(),
});

export type CreateActivityInput = z.infer<typeof createActivitySchema>;
export type ActivityInfiniteInput = z.infer<typeof activityInfiniteSchema>;
