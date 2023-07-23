import { router } from '@/config/trpc';
import { protectedProcedure } from '@/middlewares/isAuthed';
import { createGoalSchema } from './schema';
import { createGoal } from './controller';

export const goalRouter = router({
  create: protectedProcedure.input(createGoalSchema).mutation(createGoal),
});
