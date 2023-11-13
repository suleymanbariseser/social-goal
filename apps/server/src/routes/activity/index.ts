import { router } from '@/config/trpc';
import { activityInfiniteSchema, createActivitySchema } from './schema';
import { createActivity, getNetworkActivities } from './controller';
import { protectedProcedure } from '@/middlewares/isAuthed';
import { likesRouter } from './likes';

export const activityRouter = router({
  create: protectedProcedure.input(createActivitySchema).mutation(createActivity),
  activities: protectedProcedure.input(activityInfiniteSchema).query(getNetworkActivities),
  likes: likesRouter
});
