import { publicProcedure, router } from '@/config/trpc';
import { z } from 'zod';
import { completeRegisterUser, login, registerUser, verifyEmail } from './controller';
import {
  completeRegisterSchema,
  emailVerificationSchema,
  loginSchema,
  registerUserSchema,
} from './schema';

export const authRouter = router({
  login: publicProcedure.input(loginSchema).mutation(login),
  register: publicProcedure.input(registerUserSchema).mutation(registerUser),
  verify: publicProcedure.input(emailVerificationSchema).mutation(verifyEmail),
  completeRegister: publicProcedure.input(completeRegisterSchema).mutation(completeRegisterUser),
});

export type AuthRouter = typeof authRouter;
