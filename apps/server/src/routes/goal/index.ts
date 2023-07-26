import { router } from '@/config/trpc';
import { createGoalSchema } from './schema';
import { createGoal, getGoals } from './controller';
import { protectedProcedure } from '@/middlewares/isAuthed';

export const goalRouter = router({
  create: protectedProcedure.input(createGoalSchema).mutation(createGoal),
  list: protectedProcedure.query(getGoals),
});
