CREATE UNIQUE INDEX IF NOT EXISTS "user_text_idx" ON "user_recent_searches" USING btree ("owner_id","text");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_user_idx" ON "user_recent_searches" USING btree ("owner_id","user_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_goal_idx" ON "user_recent_searches" USING btree ("owner_id","goal_id");