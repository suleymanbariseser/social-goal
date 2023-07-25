import { InputOptions } from '@/types/trpc';
import { CreateGoalInput } from './schema';
import { db } from '@/config/db';
import { goals } from '@/config/db/schema';
import { eq } from 'drizzle-orm';

export const createGoal = async ({ input, ctx }: InputOptions<CreateGoalInput>) => {
  const goal = await db
    .insert(goals)
    .values({
      creatorId: ctx.user!.id,
      title: input.title,
      startDate: input.startDate,
      description: input.description,
      endDate: input.endDate,
    })
    .returning();

  return goal[0];
};

export const getGoals = async ({ ctx }: InputOptions<unknown>) => {
  return await db.select().from(goals).where(eq(goals.creatorId, ctx.user!.id));
};
