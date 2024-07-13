import { db } from '@/config/db';
import { userRecentSearches } from '@/config/db/schema';
import { ProtectedInputOptions } from '@/types/trpc';
import { eq } from 'drizzle-orm';

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
      },
      goal: {
        columns: {
          id: true,
          title: true,
        },
      },
    },
  });
};
