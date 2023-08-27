import { db } from '@/config/db';
import { users } from '@/config/db/schema';
import { ProtectedInputOptions } from '@/types/trpc';
import { eq } from 'drizzle-orm';
import { ProfileSummaryInput } from './schema';

export const getUserInfo = async ({ ctx }: ProtectedInputOptions<any>) => {
  const user = await db
    .select({
      id: users.id,
      email: users.email,
      firstName: users.firstName,
      lastName: users.lastName,
    })
    .from(users)
    .where(eq(users.id, ctx.user.id));

  return user[0];
};

export const getProfileSummary = async ({ input }: ProtectedInputOptions<ProfileSummaryInput>) => {
  const userSummary = await db.query.users.findFirst({
    where: eq(users.id, input.id),
    columns: {
      id: true,
      firstName: true,
      lastName: true,
      description: true,
      image: true,
    },
    with: {
      goals: {
        columns: {
          id: true,
        },
      },
      socialLinks: true,
      followers: {
        columns: {
          id: true,
        },
      },
      followings: {
        columns: {
          id: true,
        },
      },
    },
  });

  return {
    ...userSummary,
    // TODO get this data by using count in sql
    goals: userSummary?.goals.length ?? 0,
    followers: userSummary?.followers.length ?? 0,
    followings: userSummary?.followings.length ?? 0,
  };
};
