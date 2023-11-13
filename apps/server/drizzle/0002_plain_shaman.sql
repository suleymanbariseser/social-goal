DROP INDEX IF EXISTS "user_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "activity_idx";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_activity_idx" ON "activity_likes" ("user_id","activity_id");