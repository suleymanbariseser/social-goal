import { router } from '@/config/trpc';
import { activityInfiniteSchema, activityWithIdSchema, createActivitySchema } from './schema';
import { createActivity, getActivityWithId, getNetworkActivities } from './controller';
import { protectedProcedure } from '@/middlewares/isAuthed';
import { likesRouter } from './likes';
import { activityCommentsRouter } from './comments';

export const activityRouter = router({
  create: protectedProcedure.input(createActivitySchema).mutation(createActivity),
  list: protectedProcedure.input(activityInfiniteSchema).query(getNetworkActivities),
  activityWithId: protectedProcedure.input(activityWithIdSchema).query(getActivityWithId),
  likes: likesRouter,
  comments: activityCommentsRouter
});
