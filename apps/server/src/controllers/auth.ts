import { and, eq, gte } from 'drizzle-orm';
import { hash } from 'bcrypt';
import { db } from '@/lib/db';
import { userVerifications, users } from '@/lib/db/schema';
import { InputOptions } from '@/types/trpc';
import { RegisterUserInput } from '@/schemas/auth';
import { createCode } from '@/lib/nanoid';

export const registerUser = async ({ input }: InputOptions<RegisterUserInput>) => {
  const { email, firstName, lastName } = input;

  console.log('called', db.select);

  // find user by email
  const user = await db
    .select({
      id: users.id,
    })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  console.log('user', user);

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

  if (verifications.length >= 3) throw new Error('Too many attempts! Please try again later');

  const code = createCode({
    length: 5,
    includeUppercase: true,
    includeNumbers: true,
  });

  const hashedCode = await hash(code, 10);

  const newVerification = await db.insert(userVerifications).values({
    firstName,
    lastName,
    email,
    code: hashedCode,
  });

  console.log('hashedCode', hashedCode);
  console.log('newVerification', newVerification);
};
