import { router } from '@/config/trpc';
import { protectedProcedure } from '@/middlewares/isAuthed';
import { followUserSchema, unfollowUserSchema, userSettingsSchema } from './schema';
import { followUser, getUserSettings, unfollowUser } from './controller';

export const userRelationshipsRouter = router({
  follow: protectedProcedure.input(followUserSchema).mutation(followUser),
  unfollow: protectedProcedure.input(unfollowUserSchema).mutation(unfollowUser),
  settings: protectedProcedure.input(userSettingsSchema).query(getUserSettings),
});

export type UserRelationshipsRouter = typeof userRelationshipsRouter;
