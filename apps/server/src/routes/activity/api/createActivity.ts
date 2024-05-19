import { ProtectedInputOptions } from "@/types/trpc";
import { CreateActivityInput } from "../schema";
import { db } from "@/config/db";
import { activities, activityAssets } from "@/config/db/schema";

export const createActivity = async ({
    ctx,
    input,
  }: ProtectedInputOptions<CreateActivityInput>) => {
    const newActivities = await db
      .insert(activities)
      .values({
        content: input.content,
        creatorId: ctx.user.id,
        goalId: input.goalId,
      })
      .returning();
  
    const activity = newActivities[0];
  
    if (input.assets && input.assets?.length > 0) {
      await db.insert(activityAssets).values(
        input.assets.map((uri) => ({
          activityId: activity.id,
          uri,
        }))
      );
    }
  
    return activity;
  };