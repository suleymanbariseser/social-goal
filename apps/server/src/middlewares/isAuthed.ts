import { db } from '@/config/db';
import { users } from '@/config/db/schema';
import { t } from '@/config/trpc';
import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';

export const isAuthed = t.middleware(async (opts) => {
  const { ctx } = opts;
  if (!ctx.user || !ctx.user.id) throw new TRPCError({ code: 'UNAUTHORIZED' });

  const user = await db
    .select({
      id: users.id,
    })
    .from(users)
    .where(eq(users.id, ctx.user.id))
    .limit(1);

  if (!user || user.length === 0) throw new TRPCError({ code: 'UNAUTHORIZED' });

  return opts.next({
    ctx: {
      user: user[0],
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthed);
