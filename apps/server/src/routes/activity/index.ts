import { publicProcedure, router } from '@/config/trpc';
import { activityInfiniteSchema, createActivitySchema, feedEventSchema } from './schema';
import { createActivity, feedEvents, getNetworkActivities } from './controller';
import { protectedProcedure } from '@/middlewares/isAuthed';
import { likesRouter } from './likes';

export const activityRouter = router({
  create: protectedProcedure.input(createActivitySchema).mutation(createActivity),
  activities: protectedProcedure.input(activityInfiniteSchema).query(getNetworkActivities),
  feedEvents: publicProcedure.input(feedEventSchema).subscription(feedEvents),
  likes: likesRouter
});
