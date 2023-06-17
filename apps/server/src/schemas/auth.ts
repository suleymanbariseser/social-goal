import { z } from 'zod';

export const registerUserSchema = z.object({
  firstName: z.string().min(3).max(64),
  lastName: z.string().min(3).max(64),
  email: z.string().email().min(5).max(64),
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
