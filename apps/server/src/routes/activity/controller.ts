import { InputOptions, ProtectedInputOptions } from '@/types/trpc';
import { ActivityInfiniteInput, CreateActivityInput, FeedEventInput } from './schema';
import { db } from '@/config/db';
import { activities } from '@/config/db/schema';
import { lte } from 'drizzle-orm';
import { observable } from '@trpc/server/observable';
import { FeedEvent, feedCache, feedEmitter } from './utils';
import { getUserFromToken } from '@/middlewares/isAuthed';

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
      likes: {
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

  // TODO: get count of likes with SQL
  const activitiesWithLikes = allActivities.map(({ likes, ...activity }) => ({
    ...activity,
    likes: likes.length,
  }));

  feedCache.sync(activitiesWithLikes);

  return {
    items: activitiesWithLikes,
    nextCursor,
  };
};

export const feedEvents = async ({ input }: InputOptions<FeedEventInput>) => {
  const user = await getUserFromToken(input.token);

  return observable<FeedEvent>((emit) => {
    const onAdd = (data: FeedEvent) => {
      emit.next(data);
    };

    feedEmitter.on(onAdd);

    return () => {
      feedEmitter.off(onAdd);
    };
  });
};

export type NetworkActivity = Awaited<ReturnType<typeof getNetworkActivities>>['items'][0];
