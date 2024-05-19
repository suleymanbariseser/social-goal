import { ProtectedInputOptions } from '@/types/trpc';
import { DeleteActivityInput } from '../schema';
import { db } from '@/config/db';
import { eq } from 'drizzle-orm';
import { activities, activityCommentLikes, activityComments, activityLikes } from '@/config/db/schema';
import { TRPCError } from '@trpc/server';

export const deleteActivity = async ({
  ctx,
  input,
}: ProtectedInputOptions<DeleteActivityInput>) => {
  const activity = await db.query.activities.findFirst({
    where: eq(activities.id, input.id),
  });

  if (!activity) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      cause: 'Activity not found',
    });
  }

  if (activity.creatorId !== ctx.user.id) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      cause: 'You are not the owner of this activity',
    });
  }

  await db.delete(activities).where(eq(activities.id, input.id));
};
