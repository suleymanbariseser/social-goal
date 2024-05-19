import { router } from '@/config/trpc';
import { activityInfiniteSchema, activityWithIdSchema, createActivitySchema, deleteActivitySchema } from './schema';
import { createActivity, deleteActivity, getActivityWithId, getNetworkActivities } from './controller';
import { protectedProcedure } from '@/middlewares/isAuthed';
import { likesRouter } from './likes';
import { activityCommentsRouter } from './comments';

export const activityRouter = router({
  create: protectedProcedure.input(createActivitySchema).mutation(createActivity),
  list: protectedProcedure.input(activityInfiniteSchema).query(getNetworkActivities),
  activityWithId: protectedProcedure.input(activityWithIdSchema).query(getActivityWithId),
  delete: protectedProcedure.input(deleteActivitySchema).mutation(deleteActivity),
  likes: likesRouter,
  comments: activityCommentsRouter
});
