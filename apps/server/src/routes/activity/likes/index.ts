import { router } from '@/config/trpc';
import { protectedProcedure } from '@/middlewares/isAuthed';
import { likeByIdSchema, unlikeActivityByIdSchema } from './schema';
import { likeActivityById, unlikeActivityById } from './controller';

export const likesRouter = router({
  likeById: protectedProcedure.input(likeByIdSchema).mutation(likeActivityById),
  unlikeById: protectedProcedure.input(unlikeActivityByIdSchema).mutation(unlikeActivityById),
});
