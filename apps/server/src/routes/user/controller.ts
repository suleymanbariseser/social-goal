import { db } from '@/config/db';
import { userRelationships, users } from '@/config/db/schema';
import { ProtectedInputOptions } from '@/types/trpc';
import { and, eq } from 'drizzle-orm';
import { ProfileSummaryInput, UserSettingsInput } from './schema';

export const getUserInfo = async ({ ctx }: ProtectedInputOptions<any>) => {
  const user = await db
    .select({
      id: users.id,
      email: users.email,
      firstName: users.firstName,
      lastName: users.lastName,
    })
    .from(users)
    .where(eq(users.id, ctx.user.id));

  return user[0];
};

export const getProfileSummary = async ({ input }: ProtectedInputOptions<ProfileSummaryInput>) => {
  const userSummary = await db.query.users.findFirst({
    where: eq(users.id, input.id),
    columns: {
      id: true,
      firstName: true,
      lastName: true,
      description: true,
      image: true,
    },
    with: {
      goals: {
        columns: {
          id: true,
        },
      },
      socialLinks: true,
      followers: {
        columns: {
          id: true,
        },
      },
      followings: {
        columns: {
          id: true,
        },
      },
    },
  });

  return {
    ...userSummary,
    // TODO get this data by using count in sql
    goals: userSummary?.goals.length ?? 0,
    followers: userSummary?.followers.length ?? 0,
    followings: userSummary?.followings.length ?? 0,
  };
};

export const getUserSettings = async ({ ctx, input }: ProtectedInputOptions<UserSettingsInput>) => {
  const response = {
    blockedBy: false,
    blocking: false,
    followedBy: false,
    following: false,
    protected: false,
  };

  if (ctx.user.id === input.id) {
    return response;
  }
  const following = await db.query.userRelationships.findFirst({
    columns: { id: true },
    where: and(
      eq(userRelationships.followerId, ctx.user.id),
      eq(userRelationships.followingId, input.id)
    ),
  });

  if (following) response.following = true;

  const followedBy = await db.query.userRelationships.findFirst({
    columns: { id: true },
    where: and(
      eq(userRelationships.followingId, ctx.user.id),
      eq(userRelationships.followerId, input.id)
    ),
  });

  if (followedBy) response.followedBy = true;

  return response;
};
