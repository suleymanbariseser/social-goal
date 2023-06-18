import { z } from 'zod';

export const registerUserSchema = z.object({
  firstName: z
    .string({
      required_error: 'First name is required',
    })
    .min(3, { message: 'First name must be at least 3 characters long' })
    .max(64, { message: 'First name must be less than 64 characters long' }),
  lastName: z
    .string({
      required_error: 'Last name is required',
    })
    .min(3, { message: 'Last name must be at least 3 characters long' })
    .max(64, { message: 'Last name must be less than 64 characters long' }),
  email: z
    .string({ required_error: 'Email is required' })
    .email()
    .min(5, { message: 'Email must be at least 5 characters long' })
    .max(64, {
      message: 'Email must be less than 64 characters long',
    }),
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
