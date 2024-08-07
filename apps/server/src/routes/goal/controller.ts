import { ProtectedInputOptions } from '@/types/trpc';
import { CreateGoalInput, GoalActivitiesInput, GoalSummaryInput } from './schema';
import { db } from '@/config/db';
import { activities, goalCategories, goals } from '@/config/db/schema';
import { and, asc, eq, gte, ilike, lte } from 'drizzle-orm';
import { getInfiniteQuery } from '@/utils/infinity';

export const createGoal = async ({ input, ctx }: ProtectedInputOptions<CreateGoalInput>) => {
  const goal = await db
    .insert(goals)
    .values({
      creatorId: ctx.user.id,
      title: input.title,
      startDate: input.startDate,
      description: input.description,
      endDate: input.endDate,
    })
    .returning({
      id: goals.id,
    });

  if (input.category.length > 0) {
    await db
      .insert(goalCategories)
      .values(input.category.map((categoryId) => ({ goalId: goal[0].id, categoryId })));
  }

  return goal[0];
};

export const getGoalsActivities = async ({ input }: ProtectedInputOptions<GoalActivitiesInput>) => {
  return await db.query.goals.findMany({
    where: and(
      eq(goals.creatorId, input.id),
      lte(goals.startDate, input.endDate),
      gte(goals.endDate, input.startDate)
    ),
    columns: {
      id: true,
      title: true,
      startDate: true,
      endDate: true,
    },
    with: {
      activities: {
        columns: {
          id: true,
          createdAt: true,
        },
        orderBy: [asc(activities.createdAt)],
      },
    },
    orderBy: [asc(goals.createdAt)],
  });
};

export const getGoalSummary = async ({ input }: ProtectedInputOptions<GoalSummaryInput>) => {
  return await db.query.goals.findFirst({
    columns: {
      id: true,
      title: true,
      startDate: true,
      endDate: true,
      description: true,
      createdAt: true,
    },
    with: {
      creator: true,
    },
    where: eq(goals.id, input.id),
  });
};

export type GoalItem = {
  id: number;
  title: string;
  creator: {
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    image: string;
  };
};

export const getGoalsList = async ({ input }: ProtectedInputOptions<any>) => {
  const { items: allGoals, nextCursor } = await getInfiniteQuery(
    'goals',
    {
      where: and(
        input.userId ? eq(goals.creatorId, input.userId) : undefined,
        input.q ? ilike(goals.title, `%${input.q}%`) : undefined
      ),
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
    {
      cursor: input.cursor,
      limit: input.limit,
    }
  );

  return {
    items: allGoals as unknown as GoalItem[],
    nextCursor,
  };
};
