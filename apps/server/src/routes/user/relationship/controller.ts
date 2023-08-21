import { ProtectedInputOptions } from '@/types/trpc';
import { FollowUserInput } from './schema';
import { TRPCError } from '@trpc/server';
import { db } from '@/config/db';
import { userRelationships } from '@/config/db/schema';
import { and, eq } from 'drizzle-orm';

export const followUser = async ({ ctx, input }: ProtectedInputOptions<FollowUserInput>) => {
  if (ctx.user.id === input.userId) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'You cannot follow yourself',
    });
  }

  const relations = await db
    .select({ id: userRelationships.id })
    .from(userRelationships)
    .where(
      and(
        eq(userRelationships.followerId, ctx.user.id),
        eq(userRelationships.followingId, input.userId)
      )
    );

  if (relations.length > 0) return relations[0];

  const newRelations = await db
    .insert(userRelationships)
    .values({
      followerId: ctx.user.id,
      followingId: input.userId,
    })
    .returning({
      id: userRelationships.id,
    });

  return newRelations[0];
};
