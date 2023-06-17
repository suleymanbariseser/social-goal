import { router } from '@/lib/trpc';
import { userRouter } from './user';
import { authRouter } from './auth';

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
