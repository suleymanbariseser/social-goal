import { router } from '@/config/trpc';
import { createGoalSchema, goalActivitiesSchema } from './schema';
import { createGoal, getGoals, getGoalsActivities } from './controller';
import { protectedProcedure } from '@/middlewares/isAuthed';

export const goalRouter = router({
  create: protectedProcedure.input(createGoalSchema).mutation(createGoal),
  list: protectedProcedure.query(getGoals),
  activities: protectedProcedure.input(goalActivitiesSchema).query(getGoalsActivities)
});
