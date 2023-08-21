import { router } from '@/config/trpc';
import { protectedProcedure } from '@/middlewares/isAuthed';
import { followUserSchema } from './schema';
import { followUser } from './controller';

export const userRelationshipsRouter = router({
  follow: protectedProcedure.input(followUserSchema).mutation(followUser),
});

export type UserRelationshipsRouter = typeof userRelationshipsRouter;
