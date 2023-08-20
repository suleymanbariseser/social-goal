import { router } from '@/config/trpc';
import { protectedProcedure } from '@/middlewares/isAuthed';
import { getProfileSummary, getUserInfo } from './controller';
import { profileSummarySchema } from './schema';

export const userRouter = router({
  info: protectedProcedure.query(getUserInfo),
  profile: protectedProcedure.input(profileSummarySchema).query(getProfileSummary),
});

export type UserRouter = typeof userRouter;
