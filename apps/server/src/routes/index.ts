import { router } from '@/config/trpc';
import { userRouter } from './user';
import { authRouter } from './auth';
import { goalRouter } from './goal';

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  goal: goalRouter
});

export type AppRouter = typeof appRouter;
