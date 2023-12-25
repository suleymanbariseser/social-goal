import { z } from 'zod';

export const getCommentsSchema = z.object({
  activityId: z.number({
    required_error: 'Activity ID is required',
  }),
  parentCommentId: z.number().nullish(),
});

export const createCommentInputSchema = z.object({
  activityId: z.number({
    required_error: 'Activity ID is required',
  }),
  parentCommentId: z.number().nullish(),
  content: z.string({
    required_error: 'Content is required',
  }),
});

export type GetCommentsInput = z.infer<typeof getCommentsSchema>;
export type CreateCommentInput = z.infer<typeof createCommentInputSchema>;
