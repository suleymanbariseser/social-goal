import { db } from '@/config/db';
import { z } from 'zod';

const DEFAULT_LIMIT = 10;
const MIN_LIMIT = 5;
const MAX_LIMIT = 100;

type DbTable = keyof typeof db.query;
type Options = {
  /**
   * @default 10
   */
  limit?: number | null;
  cursor?: number | null;
};

export const getInfiniteQuery = async <T extends DbTable>(
  table: T,
  queries: Parameters<(typeof db.query)[T]['findMany']>[0],
  { limit: defaultLimit, cursor }: Options
) => {
  const limit = Math.min(Math.max(defaultLimit || DEFAULT_LIMIT, MIN_LIMIT), MAX_LIMIT);

  const result = await db.query[table].findMany({
    ...queries,
    limit: limit + 1,
    offset: cursor ? cursor * limit : undefined,
  });

  let nextCursor: number | undefined = undefined;
  if (result.length > limit) {
    result.pop();
    nextCursor = (cursor ?? 0) + 1;
  }

  return {
    result,
    nextCursor,
  };
};

export const infiniteSchema = <T extends z.ZodRawShape>(shape: T) =>
  z.object({
    ...shape,
    limit: z.number().min(MIN_LIMIT).max(MAX_LIMIT).nullish(),
    cursor: z.number().nullish(),
    timestamp: z.date(),
  });
