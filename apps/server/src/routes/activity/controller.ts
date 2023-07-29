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

export const getNetworkActivities = async () => {
  const allActivities = await db.query.activities.findMany({
    with: {
      goal: true,
      creator: true,
    },
  });

  return allActivities;
};
