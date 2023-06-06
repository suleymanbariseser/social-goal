import { z } from 'zod';
import { publicProcedure, router } from '../lib/trpc';

export const authRouter = router({
  login: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(() => {
      return {};
    }),
});

export type AuthRouter = typeof authRouter;
