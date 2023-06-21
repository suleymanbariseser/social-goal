import { publicProcedure, router } from '@/config/trpc';
import { z } from 'zod';
import { registerUser } from './controller';
import { registerUserSchema } from './schema';

export const authRouter = router({
  login: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(() => {
      return {};
    }),
  register: publicProcedure.input(registerUserSchema).mutation(registerUser),
});

export type AuthRouter = typeof authRouter;
