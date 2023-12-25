import { router } from '@/config/trpc';
import { protectedProcedure } from '@/middlewares/isAuthed';
import { createCommentInputSchema, getCommentsSchema } from './schema';
import { createComment, getComments } from './controller';

export const activityCommentsRouter = router({
  list: protectedProcedure.input(getCommentsSchema).query(getComments),
  create: protectedProcedure.input(createCommentInputSchema).mutation(createComment),
});
