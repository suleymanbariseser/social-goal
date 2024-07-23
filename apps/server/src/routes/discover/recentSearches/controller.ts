import { db } from '@/config/db';
import { userRecentSearches } from '@/config/db/schema';
import { ProtectedInputOptions } from '@/types/trpc';
import { eq } from 'drizzle-orm';
import { AddSearchSchema, DeleteSearchSchema } from './schema';
import { TRPCError } from '@trpc/server';

export const getRecentSearches = async ({ ctx }: ProtectedInputOptions<any>) => {
  return await db.query.userRecentSearches.findMany({
    where: eq(userRecentSearches.ownerId, ctx.user.id),
    with: {
      user: {
        columns: {
          id: true,
          firstName: true,
          lastName: true,
          image: true,
        },
        extras: (table, { sql }) => ({
          fullName: sql<string>`concat(${table.firstName} || ' ' || ${table.lastName})`.as(
            'creator_full_name'
          ),
        }),
      },
      goal: {
        columns: {
          id: true,
          title: true,
        },
        with: {
          creator: {
            columns: {
              id: true,
              firstName: true,
              lastName: true,
              image: true,
            },
            extras: (table, { sql }) => ({
              fullName: sql<string>`concat(${table.firstName} || ' ' || ${table.lastName})`.as(
                'creator_full_name'
              ),
            }),
          },
        },
      },
    },
  });
};

export type RecentSearchItem = Awaited<ReturnType<typeof getRecentSearches>>['0'];

export const addSearch = async ({ input, ctx }: ProtectedInputOptions<AddSearchSchema>) => {
  await db.insert(userRecentSearches).values({
    ownerId: ctx.user.id,
    type: input.type,
    ...(input.type === 'text'
      ? { text: input.text }
      : input.type === 'goal'
      ? { goalId: input.goalId }
      : { userId: input.userId }),
  });
};

export const deleteSearch = async ({ input, ctx }: ProtectedInputOptions<DeleteSearchSchema>) => {
  const search = await db.query.userRecentSearches.findFirst({
    where: eq(userRecentSearches.id, input.id),
  });

  if (!search) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Search not found',
    });
  }

  if (search.ownerId !== ctx.user.id) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'You do not have permission to delete this search',
    });
  }

  await db.delete(userRecentSearches).where(eq(userRecentSearches.id, input.id));
};

export const clearSearches = async ({ ctx }: ProtectedInputOptions<any>) => {
  await db.delete(userRecentSearches).where(eq(userRecentSearches.ownerId, ctx.user.id));
};
