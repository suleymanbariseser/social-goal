import { ProtectedInputOptions } from '@/types/trpc';
import { CreateCommentInput } from './schema';
import { db } from '@/config/db';
import { and, desc, eq, isNull } from 'drizzle-orm';
import { activityComments } from '@/config/db/schema';

export const getComments = async ({ input }: ProtectedInputOptions<CreateCommentInput>) => {
  const allComments = await db.query.activityComments.findMany({
    where: and(
      eq(activityComments.activityId, input.activityId),
      input.parentCommentId
        ? eq(activityComments.id, input.parentCommentId)
        : isNull(activityComments.parentCommentId)
    ),
    orderBy: [desc(activityComments.createdAt)],
    with: {
      user: {
        columns: {
          id: true,
          image: true,
        },
        extras: (table, { sql }) => ({
          fullName: sql<string>`concat(${table.firstName} || ' ' || ${table.lastName})`.as(
            'creator_full_name'
          ),
        }),
      },
      childComments: {
        columns: {
          id: true,
        },
      },
    },
  });

  return allComments.map(({ childComments, ...comment }) => ({
    ...comment,
    childComments: childComments.length,
  }));
};

export type NetworkActivityComment = Awaited<ReturnType<typeof getComments>>[0];
