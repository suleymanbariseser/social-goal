import { ProtectedInputOptions } from '@/types/trpc';
import { ActivityInfiniteInput, CreateActivityInput } from './schema';
import { db } from '@/config/db';
import { activities } from '@/config/db/schema';
import { lte } from 'drizzle-orm';

export const createActivity = async ({
  ctx,
  input,
}: ProtectedInputOptions<CreateActivityInput>) => {
  const newActivity = await db
    .insert(activities)
    .values({
      content: input.content,
      creatorId: ctx.user.id,
      goalId: input.goalId,
    })
    .returning();

  return newActivity[0];
};

export const getNetworkActivities = async ({
  input,
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
      likedBy: {
        columns: {
          id: true,
        },
      },
    },
    limit: limit + 1,
    offset: input.cursor ? input.cursor * limit : undefined,
    where: lte(activities.createdAt, input.timestamp),
    orderBy: (acts, { desc }) => [desc(acts.createdAt)],
  });

  let nextCursor: number | undefined = undefined;
  if (allActivities.length > limit) {
    allActivities.pop();
    nextCursor = (input.cursor ?? 0) + 1;
  }

  return {
    // TODO: get count of likes with SQL
    items: allActivities.map(({ likedBy, ...activity }) => ({
      ...activity,
      likes: likedBy.length,
    })),
    nextCursor,
  };
};

export type NetworkActivity = Awaited<ReturnType<typeof getNetworkActivities>>['items'][0];
