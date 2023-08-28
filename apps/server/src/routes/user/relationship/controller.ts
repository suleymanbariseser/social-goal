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

  const settings = await getUserSettings({ ctx, input });

  if (settings.following) return settings;

  const newRelations = await db
    .insert(userRelationships)
    .values({
      followerId: ctx.user.id,
      followingId: input.id,
    })
    .returning({
      id: userRelationships.id,
    });

  if (newRelations) settings.following = true;

  return settings;
};

export const unfollowUser = async ({ ctx, input }: ProtectedInputOptions<FollowUserInput>) => {
  if (ctx.user.id === input.id) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'You cannot unfollow yourself',
    });
  }

  const settings = await getUserSettings({ ctx, input });

  if (!settings.following) return settings;

  const relation = await db
    .delete(userRelationships)
    .where(
      and(
        eq(userRelationships.followerId, ctx.user.id),
        eq(userRelationships.followingId, input.id)
      )
    )
    .returning({
      id: userRelationships.id,
    });

  if (relation) settings.following = false;

  return settings;
};

export type UserSettings = {
  blockedBy: boolean;
  blocking: boolean;
  followedBy: boolean;
  following: boolean;
  protected: boolean;
};

export const getUserSettings = async ({
  ctx,
  input,
}: ProtectedInputOptions<UserSettingsInput>): Promise<UserSettings> => {
  const response: UserSettings = {
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
