import { infiniteSchema } from '@/utils/infinity';
import { z } from 'zod';

export const getCommentsSchema = infiniteSchema({
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

export const likeCommentInputSchema = z.object({
  commentId: z.number({
    required_error: 'Comment ID is required',
  }),
});

export const unlikeCommentInputSchema = z.object({
  commentId: z.number({
    required_error: 'Comment ID is required',
  }),
});

export type GetCommentsInput = z.infer<typeof getCommentsSchema>;
export type CreateCommentInput = z.infer<typeof createCommentInputSchema>;
export type LikeCommentInput = z.infer<typeof likeCommentInputSchema>;
export type UnlikeCommentInput = z.infer<typeof unlikeCommentInputSchema>;
