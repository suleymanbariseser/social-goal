import { db } from '@/config/db';
import { ProtectedInputOptions } from '@/types/trpc';
import { ilike } from 'drizzle-orm';
import { SearchRecommendationInput } from './schema';
import { users } from '@/config/db/schema';

export const searchRecommendation = async ({
  input,
}: ProtectedInputOptions<SearchRecommendationInput>) => {
  const goalRecommendation = await db.query.users.findMany({
    where: ilike(users.firstName, `%${input.q}%`),
  });

  return goalRecommendation;
};
