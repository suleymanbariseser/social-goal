ALTER TABLE "activity_likes" DROP CONSTRAINT "activity_likes_activity_id_activities_id_fk";
--> statement-breakpoint
ALTER TABLE "activity_comments" DROP CONSTRAINT "activity_comments_activity_id_activities_id_fk";
--> statement-breakpoint
ALTER TABLE "activity_comment_likes" DROP CONSTRAINT "activity_comment_likes_comment_id_activity_comments_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "activity_likes" ADD CONSTRAINT "activity_likes_activity_id_activities_id_fk" FOREIGN KEY ("activity_id") REFERENCES "activities"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "activity_comments" ADD CONSTRAINT "activity_comments_activity_id_activities_id_fk" FOREIGN KEY ("activity_id") REFERENCES "activities"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "activity_comment_likes" ADD CONSTRAINT "activity_comment_likes_comment_id_activity_comments_id_fk" FOREIGN KEY ("comment_id") REFERENCES "activity_comments"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
