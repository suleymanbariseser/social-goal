import { router } from '@/config/trpc';
import { createGoalSchema, getGoalsSummarySchema } from './schema';
import { createGoal, getGoals, getGoalsSummary } from './controller';
import { protectedProcedure } from '@/middlewares/isAuthed';

export const goalRouter = router({
  create: protectedProcedure.input(createGoalSchema).mutation(createGoal),
  list: protectedProcedure.query(getGoals),
  summary: protectedProcedure.input(getGoalsSummarySchema).query(getGoalsSummary)
});
