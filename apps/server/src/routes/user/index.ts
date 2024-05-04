import { router } from '@/config/trpc';
import { protectedProcedure } from '@/middlewares/isAuthed';
import { getProfileSummary, getUserInfo, getUsersList } from './controller';
import { profileSummarySchema, usersListSchema } from './schema';
import { userRelationshipsRouter } from './relationship';

export const userRouter = router({
  info: protectedProcedure.query(getUserInfo),
  profile: protectedProcedure.input(profileSummarySchema).query(getProfileSummary),
  list: protectedProcedure.input(usersListSchema).query(getUsersList),
  relations: userRelationshipsRouter,
});

export type UserRouter = typeof userRouter;
