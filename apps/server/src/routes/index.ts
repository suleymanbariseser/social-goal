import { router } from '@/config/trpc';
import { userRouter } from './user';
import { authRouter } from './auth';
import { goalRouter } from './goal';
import { activityRouter } from './activity';

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  goal: goalRouter,
  activity: activityRouter,
});

export type AppRouter = typeof appRouter;
