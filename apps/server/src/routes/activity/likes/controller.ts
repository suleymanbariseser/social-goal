import { db } from '@/config/db';
import { activityLikes } from '@/config/db/schema';
import { LikeByIdInput } from './schema';
import { ProtectedInputOptions } from '@/types/trpc';
import { and, eq } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';
import { decrementLikeCount, incrementLikeCount } from './utils';

export const likeActivityById = async ({ ctx, input }: ProtectedInputOptions<LikeByIdInput>) => {
  const like = await db.query.activityLikes.findFirst({
    columns: {
      id: true,
    },
    where: and(eq(activityLikes.userId, ctx.user.id), eq(activityLikes.activityId, input.id)),
  });

  if (like) {
    return {
      success: true,
    };
  }

  const newLike = await db
    .insert(activityLikes)
    .values({
      activityId: input.id,
      userId: ctx.user.id,
    })
    .returning({
      id: activityLikes.id,
    });

  if (!newLike || newLike.length === 0)
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      cause: 'UNKNOWN',
      message: 'Failed to create like',
    });

  incrementLikeCount(input.id);

  return {
    success: true,
  };
};

export const unlikeActivityById = async ({ ctx, input }: ProtectedInputOptions<LikeByIdInput>) => {
  const like = await db.query.activityLikes.findFirst({
    columns: {
      id: true,
    },
    where: and(eq(activityLikes.userId, ctx.user.id), eq(activityLikes.activityId, input.id)),
  });

  if (!like) {
    return {
      success: true,
    };
  }

  await db.delete(activityLikes).where(eq(activityLikes.id, like.id));

  decrementLikeCount(input.id);

  return {
    success: true,
  };
};
