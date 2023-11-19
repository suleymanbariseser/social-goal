import { db } from '@/config/db';
import { users } from '@/config/db/schema';
import { middleware, publicProcedure } from '@/config/trpc';
import { verifyUser } from '@/utils/verify-user';
import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';

export const getUserFromToken = async (token: string | null) => {
  if (!token) throw new TRPCError({ code: 'UNAUTHORIZED' });

  const userId = verifyUser(token)?.id;

  if (!userId) throw new TRPCError({ code: 'UNAUTHORIZED' });

  const user = await db
    .select({
      id: users.id,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!user || user.length === 0) throw new TRPCError({ code: 'UNAUTHORIZED' });

  return user[0];
};

export const isAuthed = middleware(async (opts) => {
  const user = await getUserFromToken(opts.ctx.token);

  return opts.next({
    ctx: {
      user,
    },
  });
});

export const protectedProcedure = publicProcedure.use(isAuthed);
