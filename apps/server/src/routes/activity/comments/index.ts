import { router } from '@/config/trpc';
import { protectedProcedure } from '@/middlewares/isAuthed';
import { createCommentInputSchema, deleteCommentInputSchema, getCommentsSchema, likeCommentInputSchema, unlikeCommentInputSchema } from './schema';
import { createComment, deleteComment, getComments, likeComment, unlikeComment } from './controller';

export const activityCommentsRouter = router({
  list: protectedProcedure.input(getCommentsSchema).query(getComments),
  create: protectedProcedure.input(createCommentInputSchema).mutation(createComment),
  like: protectedProcedure.input(likeCommentInputSchema).mutation(likeComment),
  unlike: protectedProcedure.input(unlikeCommentInputSchema).mutation(unlikeComment),
  delete: protectedProcedure.input(deleteCommentInputSchema).mutation(deleteComment),
});
