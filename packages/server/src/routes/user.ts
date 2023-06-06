import { publicProcedure, router } from '../lib/trpc';

export const userRouter = router({
  list: publicProcedure.query(() => {
    return [];
  }),
});

export type UserRouter = typeof userRouter;
