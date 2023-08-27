import { router } from '@/config/trpc';
import { protectedProcedure } from '@/middlewares/isAuthed';
import { getProfileSummary, getUserInfo, getUserSettings } from './controller';
import { profileSummarySchema, userSettingsSchema } from './schema';
import { userRelationshipsRouter } from './relationship';

export const userRouter = router({
  info: protectedProcedure.query(getUserInfo),
  profile: protectedProcedure.input(profileSummarySchema).query(getProfileSummary),
  settings: protectedProcedure.input(userSettingsSchema).query(getUserSettings),
  relations: userRelationshipsRouter,
});

export type UserRouter = typeof userRouter;
