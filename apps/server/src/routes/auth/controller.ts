import { and, eq, gte } from 'drizzle-orm';
import { hash, compare } from 'bcrypt';
import { db } from '@/config/db';
import { nanoid } from '@packages/helpers';
import { userVerifications, users } from '@/config/db/schema';
import { InputOptions } from '@/types/trpc';
import {
  CompleteRegisterInput,
  EmailVerificationInput,
  LoginInput,
  RegisterUserInput,
} from './schema';
import { resend } from '@/config/resend';
import jwt from 'jsonwebtoken';

export const registerUser = async ({ input }: InputOptions<RegisterUserInput>) => {
  const { email, firstName, lastName } = input;

  // find user by email
  const user = await db
    .select({
      id: users.id,
    })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  // if user already registered inside application then throw error
  if (user && user.length > 0) throw new Error('User already exists');

  const verifications = await db
    .select({
      id: userVerifications.id,
    })
    .from(userVerifications)
    .where(eq(userVerifications.email, email))
    .limit(1);

  // remove verification row if it exists
  if (verifications.length > 0)
    await db.delete(userVerifications).where(eq(userVerifications.id, verifications[0].id));

  // create an alpha numeric code
  const code = nanoid({
    length: 5,
    includeLowercase: false,
    includeSymbols: false,
  });
  // encrypt the code to save it in database
  const hashedCode = await hash(code, 10);

  // insert verification row into database
  await db.insert(userVerifications).values({
    firstName,
    lastName,
    email,
    code: hashedCode,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60),
  });

  // send email to user and do not wait for it
  resend.emails
    .send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Email Verification',
      html: `<div><h1>Dear ${firstName} ${lastName}</h1><p>Thank you for using our application. Please verify your email by entering the following code: <strong>${code}</strong></p></div>`,
    })
    .catch(() => {
      // TODO resend email
      return null;
    });
};

export const verifyEmail = async ({ input }: InputOptions<EmailVerificationInput>) => {
  const { email, code } = input;

  // find user by email
  const user = await db
    .select({
      id: users.id,
    })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  // if user not found then throw error
  if (user && user.length > 0) throw new Error('User already exists');

  // find verification row by email
  const verifications = await db
    .select({
      id: userVerifications.id,
      code: userVerifications.code,
    })
    .from(userVerifications)
    .where(and(eq(userVerifications.email, email), gte(userVerifications.expiresAt, new Date())))
    .limit(1);

  // if verification not found then throw error
  if (!verifications || verifications.length === 0) throw new Error('Verification not found');
  const verification = verifications[0];

  // compare the code from database with the code from user
  const isVerified = await compare(code, verification.code);

  // if code not matched then throw error
  if (!isVerified) throw new Error('Invalid code');

  // expire the verificatin so it will not be used for the next time
  await db
    .update(userVerifications)
    .set({
      expiresAt: new Date(),
    })
    .where(eq(userVerifications.id, verification.id));

  const token = jwt.sign({ id: verification.id }, process.env.EMAIL_VERIFICATION_SECRET!, {
    expiresIn: '1h',
  });

  return { token };
};

export const completeRegisterUser = async ({ input }: InputOptions<CompleteRegisterInput>) => {
  const { password, token } = input;

  const { id } = jwt.verify(token, process.env.EMAIL_VERIFICATION_SECRET!) as { id: number };

  const verifications = await db
    .select()
    .from(userVerifications)
    .where(eq(userVerifications.id, id))
    .limit(1);
  if (!verifications || verifications.length === 0) throw new Error('Verification not found');

  const verification = verifications[0];

  // if user with given email exits
  const user = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, verification.email))
    .limit(1);

  if (user && user.length > 0) throw new Error('User already exists');

  await db.delete(userVerifications).where(eq(userVerifications.id, verification.id));

  const hashedPassword = await hash(password, 10);

  const newUsers = await db
    .insert(users)
    .values({
      firstName: verification.firstName,
      lastName: verification.lastName,
      email: verification.email,
      password: hashedPassword,
    })
    .returning({
      id: users.id,
    });

  const authToken = jwt.sign({ id: newUsers[0].id }, process.env.AUTH_SECRET!, { expiresIn: '2d' });

  // send welcome email to user and do not wait for it
  resend.emails
    .send({
      from: 'onboarding@resend.dev',
      to: verification.email,
      subject: 'Welcome to Social Goal',
      html: `<div><h1>Dear ${verification.firstName} ${verification.lastName}</h1><p>Thank you for using our application. You can now login with your email and password.</p></div>`,
    })
    .catch(() => null);

  return { token: authToken };
};

export const login = async ({ input }: InputOptions<LoginInput>) => {
  const { email, password } = input;

  // find user by email
  const user = await db
    .select({ id: users.id, password: users.password })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  // if user not found then throw error
  if (!user || user.length === 0) throw new Error('Invalid email or password');

  // compare the password from database with the password from user
  const isPasswordMatched = await compare(password, user[0].password);

  // if password not matched then throw error
  if (!isPasswordMatched) throw new Error('Invalid email or password');

  return { token: jwt.sign({ id: user[0].id }, process.env.AUTH_SECRET!, { expiresIn: '2d' }) };
};
