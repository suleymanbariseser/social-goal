import { router } from '@/config/trpc';
import { userRouter } from './user';
import { authRouter } from './auth';
import { goalRouter } from './goal';
import { activityRouter } from './activity';
import { uploadRouter } from './upload';
import { searchRouter } from './search';

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  goal: goalRouter,
  activity: activityRouter,
  upload: uploadRouter,
  search: searchRouter,
});

export type AppRouter = typeof appRouter;
