import { db } from '@/config/db';
import { users } from '@/config/db/schema';
import { middleware, publicProcedure } from '@/config/trpc';
import { verifyUser } from '@/utils/verify-user';
import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';

export const isAuthed = middleware(async (opts) => {
  const { ctx } = opts;
  if (!ctx.token) throw new TRPCError({ code: 'UNAUTHORIZED' });

  const userId = verifyUser(ctx.token)?.id;

  if (!userId) throw new TRPCError({ code: 'UNAUTHORIZED' });

  const user = await db
    .select({
      id: users.id,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!user || user.length === 0) throw new TRPCError({ code: 'UNAUTHORIZED' });

  return opts.next({
    ctx: {
      user: user[0],
    },
  });
});

export const protectedProcedure = publicProcedure.use(isAuthed);
