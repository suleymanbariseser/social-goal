import { infiniteSchema } from '@/utils/infinity';
import { z } from 'zod';

export const userRelationshipListSchema = infiniteSchema({
  id: z.number({
    required_error: 'User id is required',
  }),
});

export const followUserSchema = z.object({
  id: z.number({
    required_error: 'User id is required',
  }),
});

export const unfollowUserSchema = z.object({
  id: z.number({
    required_error: 'User id is required',
  }),
});

export const userSettingsSchema = z.object({
  id: z.number({ required_error: 'User id is required' }),
});

export type UserRelationshipInput = z.infer<typeof userRelationshipListSchema>;
export type FollowUserInput = z.infer<typeof followUserSchema>;
export type UnfollowUserInput = z.infer<typeof unfollowUserSchema>;
export type UserSettingsInput = z.infer<typeof userSettingsSchema>;
