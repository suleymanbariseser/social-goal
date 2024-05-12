CREATE TABLE IF NOT EXISTS "activity_comment_likes" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"comment_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_comment_idx" ON "activity_comment_likes" ("user_id","comment_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "activity_comment_likes" ADD CONSTRAINT "activity_comment_likes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "activity_comment_likes" ADD CONSTRAINT "activity_comment_likes_comment_id_activity_comments_id_fk" FOREIGN KEY ("comment_id") REFERENCES "activity_comments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
