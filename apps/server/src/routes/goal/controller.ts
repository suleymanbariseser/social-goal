import { InputOptions } from '@/types/trpc';
import { CreateGoalInput } from './schema';
import { db } from '@/config/db';
import { goals } from '@/config/db/schema/goal';

export const createGoal = ({ input }: InputOptions<CreateGoalInput>) => {
  const goal = db.insert(goals).values({
    title: input.title,
    startDate: input.startDate,
    description: input.description,
    endDate: input.endDate,
  });

  return goal;
};
