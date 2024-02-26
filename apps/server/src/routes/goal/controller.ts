import { ProtectedInputOptions } from '@/types/trpc';
import { CreateGoalInput, GetGoalsSummaryInput } from './schema';
import { db } from '@/config/db';
import { activities, goals } from '@/config/db/schema';
import { asc, eq } from 'drizzle-orm';

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
    .returning();

  return goal[0];
};

export const getGoalsSummary = async ({ input }: ProtectedInputOptions<GetGoalsSummaryInput>) => {
  return await db.query.goals.findMany({
    where: eq(goals.creatorId, input.id),
    columns: {
      title: true,
      startDate: true,
      endDate: true,
    },
    with: {
      activities: {
        columns: {
          createdAt: true,
          id: true,
        },
        orderBy: [asc(activities.createdAt)],
      }
    },
    orderBy: [asc(goals.createdAt)],
  })
}

export const getGoals = async ({ ctx }: ProtectedInputOptions<unknown>) => {
  return await db.select().from(goals).where(eq(goals.creatorId, ctx.user.id));
};
