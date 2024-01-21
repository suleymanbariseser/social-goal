import { db } from '@/config/db';
import { userRelationships } from '@/config/db/schema';
import { and, eq, inArray } from 'drizzle-orm';

export type UserSettings = {
  blockedBy: boolean;
  blocking: boolean;
  followedBy: boolean;
  following: boolean;
  protected: boolean;
};

export const isUserAllowedToGetRelationships = async (settings: UserSettings) => {
  if (settings.blockedBy) return false;
  if (settings.protected && !settings.following) return false;
};

export const getFollowingIdsFromUserIds = async (userId: number, ids: number[]) => {
  const followedByMeIds = await db
    .select({
      id: userRelationships.followingId,
    })
    .from(userRelationships)
    .where(
      and(eq(userRelationships.followerId, userId), inArray(userRelationships.followingId, ids))
    );

  return followedByMeIds.map((item) => item.id);
};
