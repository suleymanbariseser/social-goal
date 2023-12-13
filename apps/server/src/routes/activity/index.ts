import { publicProcedure, router } from '@/config/trpc';
import { activityInfiniteSchema, activityWithIdSchema, createActivitySchema, feedEventSchema } from './schema';
import { createActivity, feedEvents, getActivityWithId, getNetworkActivities } from './controller';
import { protectedProcedure } from '@/middlewares/isAuthed';
import { likesRouter } from './likes';
import { activityCommentsRouter } from './comments';

export const activityRouter = router({
  create: protectedProcedure.input(createActivitySchema).mutation(createActivity),
  activities: protectedProcedure.input(activityInfiniteSchema).query(getNetworkActivities),
  activityWithId: protectedProcedure.input(activityWithIdSchema).query(getActivityWithId),
  feedEvents: publicProcedure.input(feedEventSchema).subscription(feedEvents),
  likes: likesRouter,
  comments: activityCommentsRouter
});
