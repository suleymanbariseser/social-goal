import { and, eq, lte } from 'drizzle-orm';
import { hash, compare } from 'bcrypt';
import { db } from '@/config/db';
import { userVerifications, users } from '@/config/db/schema';
import { InputOptions } from '@/types/trpc';
import { EmailVerificationInput, RegisterUserInput } from './schema';
import { createCode } from '@/utils/nanoid';
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
  const code = createCode({
    length: 5,
    includeUppercase: true,
    includeNumbers: true,
  });
  // encrypt the code to save it in database
  const hashedCode = await hash(code, 10);

  // insert verification row into database
  await db.insert(userVerifications).values({
    firstName,
    lastName,
    email,
    code: hashedCode,
  });

  // send email to user and do not wait for it
  resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Email Verification',
    html: `<div><h1>Dear ${firstName} ${lastName}</h1><p>Thank you for using our application. Please verify your email by entering the following code: <strong>${code}</strong></p></div>`,
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
    .select()
    .from(userVerifications)
    .where(and(eq(userVerifications.email, email), lte(userVerifications.expiresAt, new Date())))
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
