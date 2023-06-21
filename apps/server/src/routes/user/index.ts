import { db } from '@/config/db';
import { users } from '@/config/db/schema';
import { publicProcedure, router } from '@/config/trpc';

export const userRouter = router({
  list: publicProcedure.query(async () => {
    const allUsers = await db.select().from(users);

    return allUsers;
  }),
});

export type UserRouter = typeof userRouter;
