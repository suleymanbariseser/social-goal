import { router } from '@/config/trpc';
import { userRouter } from './user';
import { authRouter } from './auth';
import { goalRouter } from './goal';
import { activityRouter } from './activity';
import { uploadRouter } from './upload';
import { searchRouter } from './search';
import { discoverRouter } from './discover';
import { categoryRouter } from './category';

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  goal: goalRouter,
  activity: activityRouter,
  upload: uploadRouter,
  search: searchRouter,
  discover: discoverRouter,
  category: categoryRouter
});

export type AppRouter = typeof appRouter;
