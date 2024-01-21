DROP INDEX IF EXISTS "follower_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "following_idx";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_relation_idx" ON "user_relationship" ("follower_id","followed_id");