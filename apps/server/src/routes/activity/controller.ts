import { InputOptions } from '@/types/trpc';
import { CreateActivityInput } from './schema';
import { db } from '@/config/db';
import { activities } from '@/config/db/schema';

export const createActivity = async ({ ctx, input }: InputOptions<CreateActivityInput>) => {
  const newActivity = await db
    .insert(activities)
    .values({
      content: input.content,
      creatorId: ctx.user!.id,
      goalId: input.goalId,
    })
    .returning();

  return newActivity;
};
