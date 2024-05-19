import { ProtectedInputOptions } from '@/types/trpc';
import { ActivityInfiniteInput } from '../schema';
import { db } from '@/config/db';
import { and, eq, gte, ilike, lte } from 'drizzle-orm';
import { activities } from '@/config/db/schema';
import { feedCache } from '../utils';

export const getNetworkActivities = async ({
  input,
  ctx,
}: ProtectedInputOptions<ActivityInfiniteInput>) => {
  const limit = input.limit || 10;

  const allActivities = await db.query.activities.findMany({
    with: {
      goal: true,
      creator: {
        extras: (table, { sql }) => ({
          fullName: sql<string>`concat(${table.firstName} || ' ' || ${table.lastName})`.as(
            'creator_full_name'
          ),
        }),
      },
      likes: {
        columns: {
          id: true,
          userId: true,
        },
      },
      comments: {
        columns: {
          id: true,
        },
      },
      assets: {
        columns: {
          uri: true,
        },
      },
    },
    limit: limit + 1,
    offset: input.cursor ? input.cursor * limit : undefined,
    where: and(
      lte(activities.createdAt, input.timestamp),
      input.userId ? eq(activities.creatorId, input.userId) : undefined,
      input.goalId ? eq(activities.goalId, input.goalId) : undefined,
      input.from ? gte(activities.createdAt, input.from) : undefined,
      input.to ? lte(activities.createdAt, input.to) : undefined,
      input.q ? ilike(activities.content, `%${input.q}%`) : undefined
    ),
    orderBy: (acts, { desc }) => [desc(acts.createdAt)],
  });

  let nextCursor: number | undefined = undefined;
  if (allActivities.length > limit) {
    allActivities.pop();
    nextCursor = (input.cursor ?? 0) + 1;
  }

  // TODO: get count of likes with SQL
  const modifiedActivities = allActivities.map(({ likes, comments, ...activity }) => ({
    ...activity,
    likes: likes.length,
    comments: comments.length,
    likedByMe: likes.some((like) => like.userId === ctx.user.id),
  }));

  feedCache.sync(modifiedActivities);

  return {
    items: modifiedActivities,
    nextCursor,
  };
};

export type NetworkActivity = Awaited<ReturnType<typeof getNetworkActivities>>['items'][0];
