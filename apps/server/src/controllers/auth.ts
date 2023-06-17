import { and, eq, gte } from 'drizzle-orm';
import { hash } from 'bcrypt';
import { db } from '@/lib/db';
import { userVerifications, users } from '@/lib/db/schema';
import { createCode } from '@/lib/nanoid';
import { RegisterUserInput } from '@/schemas/auth';
import { InputOptions } from '@/types/trpc';

export const registerUser = async ({ input }: InputOptions<RegisterUserInput>) => {
  const { email, firstName, lastName } = input;

  const user = await db.select().from(users).where(eq(users.email, email)).limit(1);

  if (user) throw new Error('User already exists');

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
