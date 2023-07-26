import { router } from '@/config/trpc';
import { createActivitySchema } from './schema';
import { createActivity } from './controller';
import { protectedProcedure } from '@/middlewares/isAuthed';

export const activityRouter = router({
  create: protectedProcedure.input(createActivitySchema).mutation(createActivity),
});
