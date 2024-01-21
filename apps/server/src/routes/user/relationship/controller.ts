import { ProtectedInputOptions } from '@/types/trpc';
import { FollowUserInput, UserRelationshipInput, UserSettingsInput } from './schema';
import { TRPCError } from '@trpc/server';
import { db } from '@/config/db';
import { userRelationships } from '@/config/db/schema';
import { and, eq, lte } from 'drizzle-orm';
import { UserSettings, getFollowingIdsFromUserIds, isUserAllowedToGetRelationships } from './utils';
import { getInfiniteQuery } from '@/utils/infinity';
import { RelationShipListItemUser, RelationShipListResponse } from './types';

export const followerList = async ({
  ctx,
  input,
}: ProtectedInputOptions<UserRelationshipInput>) => {
  const settings = await getUserSettings({
    ctx,
    input,
  });

  if (!isUserAllowedToGetRelationships(settings)) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'User is not allowed to get relationships',
    });
  }

  return getInfiniteQuery(
    'userRelationships',
    {
      columns: {
        id: true,
      },
      with: {
        follower: {
          columns: {
            id: true,
            firstName: true,
            lastName: true,
            image: true,
          },
        },
      },
      where: and(
        eq(userRelationships.followingId, ctx.user.id),
        lte(userRelationships.createdAt, input.timestamp)
      ),
    },
    {
      limit: input.limit,
      cursor: input.cursor,
    }
  );
};

export const followingList = async ({
  ctx,
  input,
}: ProtectedInputOptions<UserRelationshipInput>): Promise<RelationShipListResponse> => {
  const settings = await getUserSettings({
    ctx,
    input,
  });

  if (!isUserAllowedToGetRelationships(settings)) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'User is not allowed to get relationships',
    });
  }

  const data = await getInfiniteQuery(
    'userRelationships',
    {
      columns: {
        id: true,
      },
      with: {
        following: {
          columns: {
            id: true,
            firstName: true,
            lastName: true,
            image: true,
          },
        },
      },
      where: and(
        eq(userRelationships.followerId, ctx.user.id),
        lte(userRelationships.createdAt, input.timestamp)
      ),
    },
    {
      limit: input.limit,
      cursor: input.cursor,
    }
  );

  const ids = data.result.map((item) => ((item as any).following as RelationShipListItemUser).id);

  const followedByMeIds = await getFollowingIdsFromUserIds(ctx.user.id, ids);

  const newData = {
    ...data,
    result: data.result.map((item) => {
      const following = (item as any).following as RelationShipListItemUser;
      return {
        id: item.id,
        // TODO remove this after type improvement
        user: {
          ...following,
          followedByMe: followedByMeIds.includes(following.id),
        },
      };
    }),
  };

  return newData;
};

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
