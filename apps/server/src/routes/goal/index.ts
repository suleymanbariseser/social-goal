import { router } from '@/config/trpc';
import { createGoalSchema, goalActivitiesSchema, goalSummarySchema, goalListSchema } from './schema';
import { createGoal, getGoalSummary, getGoalsActivities, getGoalsList } from './controller';
import { protectedProcedure } from '@/middlewares/isAuthed';

export const goalRouter = router({
  create: protectedProcedure.input(createGoalSchema).mutation(createGoal),
  list: protectedProcedure.input(goalListSchema).query(getGoalsList),
  activities: protectedProcedure.input(goalActivitiesSchema).query(getGoalsActivities),
  summary: protectedProcedure.input(goalSummarySchema).query(getGoalSummary)
});
