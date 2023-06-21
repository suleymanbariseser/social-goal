import { and, eq, gte } from 'drizzle-orm';
import { hash } from 'bcrypt';
import { db } from '@/config/db';
import { userVerifications, users } from '@/config/db/schema';
import { InputOptions } from '@/types/trpc';
import { RegisterUserInput } from './schema';
import { createCode } from '@/utils/nanoid';
import { resend } from '@/config/resend';

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

  const startDate = Date.now() - 1000 * 60 * 60;

  const verifications = await db
    .select()
    .from(userVerifications)
    .where(
      and(eq(userVerifications.email, email), gte(userVerifications.createdAt, new Date(startDate)))
    )
    .limit(3);

  // if user has sent 3 emails within last hour then throw error
  if (verifications.length >= 3) throw new Error('Too many attempts! Please try again later');

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
