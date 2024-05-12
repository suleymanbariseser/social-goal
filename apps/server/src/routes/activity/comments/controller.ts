import { ProtectedInputOptions } from '@/types/trpc';
import { CreateCommentInput, GetCommentsInput } from './schema';
import { db } from '@/config/db';
import { and, desc, eq, isNull } from 'drizzle-orm';
import { activityComments } from '@/config/db/schema';

export const getComments = async ({ input }: ProtectedInputOptions<GetCommentsInput>) => {
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
      likes: {
        columns: {
          id: true,
        },
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
    likes: comment.likes.length,
    childComments: childComments.length,
  }));
};

export type NetworkActivityComment = Awaited<ReturnType<typeof getComments>>[0];

export const createComment = async ({ input, ctx }: ProtectedInputOptions<CreateCommentInput>) => {
  const comment = await db
    .insert(activityComments)
    .values({
      activityId: input.activityId,
      content: input.content,
      parentCommentId: input.parentCommentId,
      userId: ctx.user.id,
    })
    .returning();

  return comment;
};
