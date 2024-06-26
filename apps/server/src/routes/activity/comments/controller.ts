import { ProtectedInputOptions } from '@/types/trpc';
import {
  CreateCommentInput,
  DeleteCommentInput,
  GetCommentsInput,
  LikeCommentInput,
  UnlikeCommentInput,
} from './schema';
import { db } from '@/config/db';
import { and, asc, eq, isNull } from 'drizzle-orm';
import { activityCommentLikes, activityComments } from '@/config/db/schema';
import { getInfiniteQuery } from '@/utils/infinity';
import { TRPCError } from '@trpc/server';

export type NetworkActivityComment = {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: string;
  userId: number;
  activityId: number;
  parentCommentId: number | null;
  user: {
    id: number;
    image: string;
    fullName: string;
  };
  likes: number;
  likedByMe: boolean;
  childComments: number;
}

export const getComments = async ({ input, ctx }: ProtectedInputOptions<GetCommentsInput>) => {
  const { items: allComments, nextCursor } = await getInfiniteQuery(
    'activityComments',
    {
      where: and(
        eq(activityComments.activityId, input.activityId),
        input.parentCommentId
          ? eq(activityComments.id, input.parentCommentId)
          : isNull(activityComments.parentCommentId)
      ),
      orderBy: [asc(activityComments.createdAt)],
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
            userId: true,
          },
        },
        childComments: {
          columns: {
            id: true,
          },
        },
      },
    },
    {
      limit: input.limit,
      cursor: input.cursor,
    }
  );

  const newAllComments = allComments.map(({ childComments, ...comment }: any) => ({
    ...comment,
    likes: comment.likes.length,
    likedByMe: comment.likes.some((like: any) => like.userId === ctx.user.id),
    childComments: childComments.length,
  }));

  return {
    items: newAllComments as unknown as NetworkActivityComment[],
    nextCursor,
  };
};


export const likeComment = async ({ input, ctx }: ProtectedInputOptions<LikeCommentInput>) => {
  const like = await db
    .insert(activityCommentLikes)
    .values({
      userId: ctx.user.id,
      commentId: input.commentId,
    })
    .returning();

  return like;
};

export const unlikeComment = async ({ input, ctx }: ProtectedInputOptions<UnlikeCommentInput>) => {
  await db
    .delete(activityCommentLikes)
    .where(
      and(
        eq(activityCommentLikes.userId, ctx.user.id),
        eq(activityCommentLikes.commentId, input.commentId)
      )
    );

  return true;
};

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


export const deleteComment = async ({ input, ctx }: ProtectedInputOptions<DeleteCommentInput>) => {
  const comment = await db.query.activities.findFirst({
    where: eq(activityComments.id, input.commentId),
  });

  if (!comment) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      cause: 'Activity not found',
    });
  }

  if (comment.creatorId !== ctx.user.id) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      cause: 'You are not the owner of this activity',
    });
  }

  await db.delete(activityComments).where(eq(activityComments.id, input.commentId));
}