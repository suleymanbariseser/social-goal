import { router } from '@/config/trpc';
import { protectedProcedure } from '@/middlewares/isAuthed';
import { getCommentsSchema } from './schema';
import { getComments } from './controller';

export const activityCommentsRouter = router({
  list: protectedProcedure.input(getCommentsSchema).query(getComments),
});
