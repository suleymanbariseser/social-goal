import { ZodEmitter } from '@/utils/emitter';
import { z } from 'zod';
import { FeedCache } from './feed-cache';

export const feedEvent = z.object({
  type: z.enum(['like', 'comment', 'share']),
  activityId: z.number(),
  payload: z.number(),
});

export type FeedEvent = z.infer<typeof feedEvent>;

export const feedEmitter = new ZodEmitter(feedEvent);

export const feedCache = new FeedCache();
