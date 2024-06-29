import { ProtectedInputOptions } from '@/types/trpc';
import { ActivityWithIdInput } from '../schema';
import { db } from '@/config/db';
import { eq } from 'drizzle-orm';
import { activities } from '@/config/db/schema';
import { TRPCError } from '@trpc/server';

export const getActivityWithId = async ({
  input,
  ctx,
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
  });

  if (!activity) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Activity not found',
    });
  }

  // TODO: get count of likes with SQL
  const modifiedActivity = {
    ...activity,
    likes: activity.likes.length,
    likedByMe: activity.likes.some((like) => like.userId === ctx.user.id),
    comments: activity.comments.length,
  };

  return modifiedActivity;
};
