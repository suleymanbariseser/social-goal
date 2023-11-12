CREATE TABLE IF NOT EXISTS "activity_likes" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"activity_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP INDEX IF EXISTS "email_idx";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_idx" ON "activity_likes" ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "activity_idx" ON "activity_likes" ("activity_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "activity_likes" ADD CONSTRAINT "activity_likes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "activity_likes" ADD CONSTRAINT "activity_likes_activity_id_activities_id_fk" FOREIGN KEY ("activity_id") REFERENCES "activities"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");