import { router } from '@/config/trpc';
import { createGoalSchema, goalActivitiesSchema, goalSummarySchema } from './schema';
import { createGoal, getGoalSummary, getGoals, getGoalsActivities } from './controller';
import { protectedProcedure } from '@/middlewares/isAuthed';

export const goalRouter = router({
  create: protectedProcedure.input(createGoalSchema).mutation(createGoal),
  list: protectedProcedure.query(getGoals),
  activities: protectedProcedure.input(goalActivitiesSchema).query(getGoalsActivities),
  summary: protectedProcedure.input(goalSummarySchema).query(getGoalSummary)
});
