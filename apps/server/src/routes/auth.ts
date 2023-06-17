import { registerUser } from '@/controllers/auth';
import { publicProcedure, router } from '@/lib/trpc';
import { registerUserSchema } from '@/schemas/auth';
import { z } from 'zod';

export const authRouter = router({
  login: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(() => {
      return {};
    }),
  register: publicProcedure.input(registerUserSchema).mutation(registerUser),
});

export type AuthRouter = typeof authRouter;
