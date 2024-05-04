import { db } from '@/config/db';
import { userRelationships, users } from '@/config/db/schema';
import { ProtectedInputOptions } from '@/types/trpc';
import { eq, ilike } from 'drizzle-orm';
import { ProfileSummaryInput, UsersListInput } from './schema';
import { getInfiniteQuery } from '@/utils/infinity';
import { UserItem } from './relationship/types';

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

export const getUsersList = async ({ ctx, input }: ProtectedInputOptions<UsersListInput>) => {
  const { items: usersList, nextCursor } = await getInfiniteQuery(
    'users',
    {
      columns: {
        id: true,
        image: true,
        firstName: true,
        lastName: true,
      },
      where: input.q ? ilike(users.firstName, `%${input.q}%`) : undefined,
      with: {
        followers: {
          where: eq(userRelationships.followerId, ctx.user.id),
          columns: {
            id: true,
          },
        },
      },
    },
    {
      limit: input.limit,
      cursor: input.cursor,
    }
  );

  const newUsersList = usersList.map(({ followers, followings, ...user }: any) => {
    return {
      ...user,
      followedByMe: followers.length > 0,
    } as UserItem;
  });

  return { items: newUsersList, nextCursor };
};
