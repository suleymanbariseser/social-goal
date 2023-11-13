import { router } from '@/config/trpc';
import { protectedProcedure } from '@/middlewares/isAuthed';
import { likeByIdSchema } from './schema';
import { likeActivityById } from './controller';

export const likesRouter = router({
  likeById: protectedProcedure.input(likeByIdSchema).mutation(likeActivityById),
});
