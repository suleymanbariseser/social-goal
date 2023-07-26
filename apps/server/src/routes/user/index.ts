import { db } from '@/config/db';
import { users } from '@/config/db/schema';
import {  router } from '@/config/trpc';
import { protectedProcedure } from '@/middlewares/isAuthed';
import { eq } from 'drizzle-orm';

export const userRouter = router({
  info: protectedProcedure.query(async ({ ctx }) => {
    const user = await db
      .select({
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
      })
      .from(users)
      .where(eq(users.id, ctx.user.id));

    return user[0];
  }),
  list: protectedProcedure.query(async () => {
    const allUsers = await db.select().from(users);

    return allUsers;
  }),
});

export type UserRouter = typeof userRouter;
