import { z } from 'zod';

export const emailSchema = z
  .string({ required_error: 'Email is required' })
  .email()
  .min(5, { message: 'Email must be at least 5 characters long' })
  .max(64, {
    message: 'Email must be less than 64 characters long',
  });
export const passwordSchema = z
  .string({
    required_error: 'Password is required',
  })
  .min(8, { message: 'Password must be at least 8 characters long' })
  .max(64, { message: 'Password must be less than 64 characters long' })
  .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_\-+=.]).*$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
  });

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
  email: emailSchema,
});

export const emailVerificationSchema = z.object({
  email: emailSchema,
  code: z
    .string({
      required_error: 'Verification code is required',
    })
    .length(5, {
      message: 'Verification code must be 5 characters long',
    }),
});

export const completeRegisterSchema = z
  .object({
    password: passwordSchema,
    rePassword: passwordSchema,
    token: z.string({ required_error: 'Token is required' }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.rePassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['rePassword'],
      });
    }
  });

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type EmailVerificationInput = z.infer<typeof emailVerificationSchema>;
export type CompleteRegisterInput = z.infer<typeof completeRegisterSchema>;

export const loginSchema = z.object({
  email: emailSchema,
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(64, { message: 'Password must be less than 64 characters long' }),
});

export type LoginInput = z.infer<typeof loginSchema>;
