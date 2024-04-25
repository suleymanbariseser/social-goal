import { db } from '@/config/db';
import { ProtectedInputOptions } from '@/types/trpc';
import { ilike } from 'drizzle-orm';
import { SearchRecommendationInput } from './schema';
import { users } from '@/config/db/schema';

export const searchRecommendation = async ({
  input,
}: ProtectedInputOptions<SearchRecommendationInput>) => {
  const userRecommendations = await db.query.users.findMany({
    where: ilike(users.firstName, `%${input.q}%`),
    columns: {
      id: true,
      firstName: true,
      image: true,
      lastName: true,
    },
    extras: (table, { sql }) => ({
      fullName: sql<string>`concat(${table.firstName} || ' ' || ${table.lastName})`.as('full_name'),
    }),
  });

  return userRecommendations;
};

export type UserSearchRecommendation = Awaited<ReturnType<typeof searchRecommendation>>[number];
