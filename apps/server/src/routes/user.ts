import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { publicProcedure, router } from "@/lib/trpc";

export const userRouter = router({
  list: publicProcedure.query(async () => {
    const allUsers = await db.select().from(users);

    return allUsers;
  }),
});

export type UserRouter = typeof userRouter;
