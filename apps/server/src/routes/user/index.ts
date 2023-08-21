import { router } from '@/config/trpc';
import { protectedProcedure } from '@/middlewares/isAuthed';
import { getProfileSummary, getUserInfo } from './controller';
import { profileSummarySchema } from './schema';
import { userRelationshipsRouter } from './relationship';

export const userRouter = router({
  info: protectedProcedure.query(getUserInfo),
  profile: protectedProcedure.input(profileSummarySchema).query(getProfileSummary),
  relations: userRelationshipsRouter
});

export type UserRouter = typeof userRouter;
