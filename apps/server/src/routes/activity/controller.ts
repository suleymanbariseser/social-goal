import { InputOptions, ProtectedInputOptions } from '@/types/trpc';
import {
  ActivityInfiniteInput,
  ActivityWithIdInput,
  CreateActivityInput,
  FeedEventInput,
} from './schema';
import { db } from '@/config/db';
import { activities } from '@/config/db/schema';
import { eq, lte } from 'drizzle-orm';
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
      comments: {
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
  const modifiedActivities = allActivities.map(({ likes, comments, ...activity }) => ({
    ...activity,
    likes: likes.length,
    comments: comments.length,
  }));

  feedCache.sync(modifiedActivities);

  return {
    items: modifiedActivities,
    nextCursor,
  };
};

export const getActivityWithId = async ({
  input,
}: ProtectedInputOptions<ActivityWithIdInput>) => {
  const activity = await db.query.activities.findFirst({
    where: eq(activities.id, input.id),
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
      comments: {
        columns: {
          id: true,
        },
      },
    },
  });

  if (!activity) {
    throw new Error('Activity not found');
  }

  // TODO: get count of likes with SQL
  const modifiedActivity = {
    ...activity,
    likes: activity.likes.length,
    comments: activity.comments.length,
  };

  return modifiedActivity;
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
