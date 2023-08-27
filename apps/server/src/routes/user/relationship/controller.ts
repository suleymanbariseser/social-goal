import { ProtectedInputOptions } from '@/types/trpc';
import { FollowUserInput, UserSettingsInput } from './schema';
import { TRPCError } from '@trpc/server';
import { db } from '@/config/db';
import { userRelationships } from '@/config/db/schema';
import { and, eq } from 'drizzle-orm';

export const followUser = async ({ ctx, input }: ProtectedInputOptions<FollowUserInput>) => {
  if (ctx.user.id === input.id) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'You cannot follow yourself',
    });
  }

  const relation = await db.query.userRelationships.findFirst({
    columns: {
      id: true,
    },
    where: and(
      eq(userRelationships.followerId, ctx.user.id),
      eq(userRelationships.followingId, input.id)
    ),
  });

  if (relation) return relation;

  const newRelations = await db
    .insert(userRelationships)
    .values({
      followerId: ctx.user.id,
      followingId: input.id,
    })
    .returning({
      id: userRelationships.id,
    });

  return newRelations[0];
};

export const unfollowUser = async ({ ctx, input }: ProtectedInputOptions<FollowUserInput>) => {
  if (ctx.user.id === input.id) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'You cannot unfollow yourself',
    });
  }

  const relation = await db.query.userRelationships.findFirst({
    columns: {
      id: true,
    },
    where: and(
      eq(userRelationships.followerId, ctx.user.id),
      eq(userRelationships.followingId, input.id)
    ),
  });

  if (!relation) return null;

  await db.delete(userRelationships).where(eq(userRelationships.id, relation.id));

  return relation;
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
