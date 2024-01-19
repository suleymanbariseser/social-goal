import { router } from '@/config/trpc';
import { protectedProcedure } from '@/middlewares/isAuthed';
import { followUserSchema, unfollowUserSchema, userRelationshipListSchema, userSettingsSchema } from './schema';
import { followUser, followerList, followingList, getUserSettings, unfollowUser } from './controller';

export const userRelationshipsRouter = router({
  followerList: protectedProcedure.input(userRelationshipListSchema).query(followerList),
  followingList: protectedProcedure.input(userRelationshipListSchema).query(followingList),
  follow: protectedProcedure.input(followUserSchema).mutation(followUser),
  unfollow: protectedProcedure.input(unfollowUserSchema).mutation(unfollowUser),
  settings: protectedProcedure.input(userSettingsSchema).query(getUserSettings),
});

export type UserRelationshipsRouter = typeof userRelationshipsRouter;
