import { publicProcedure, router } from '@/config/trpc';
import { z } from 'zod';
import { completeRegisterUser, registerUser, verifyEmail } from './controller';
import { completeRegisterSchema, emailVerificationSchema, registerUserSchema } from './schema';

export const authRouter = router({
  login: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(() => {
      return {};
    }),
  register: publicProcedure.input(registerUserSchema).mutation(registerUser),
  verify: publicProcedure.input(emailVerificationSchema).mutation(verifyEmail),
  completeRegister: publicProcedure.input(completeRegisterSchema).mutation(completeRegisterUser),
});

export type AuthRouter = typeof authRouter;
