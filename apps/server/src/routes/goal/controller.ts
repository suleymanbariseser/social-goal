import { InputOptions } from '@/types/trpc';
import { CreateGoalInput } from './schema';
import { db } from '@/config/db';
import { goals } from '@/config/db/schema';

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
