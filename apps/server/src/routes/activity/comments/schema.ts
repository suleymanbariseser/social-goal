import { z } from 'zod';

export const getCommentsSchema = z.object({
  activityId: z.number({
    required_error: 'Activity ID is required',
  }),
  parentCommentId: z.number().nullish(),
});

export type CreateCommentInput = z.infer<typeof getCommentsSchema>;
