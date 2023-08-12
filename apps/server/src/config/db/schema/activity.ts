import { InferModel, relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { goals } from './goal';
import { users } from './user';

export const activities = pgTable('activities', {
  id: serial('id').primaryKey(),
  creatorId: integer('creator_id').notNull(),
  goalId: integer('goal_id').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  expiresAt: timestamp('expires_at').defaultNow().notNull(),
});

export type Activity = InferModel<typeof activities>;

export const activityRelations = relations(activities, ({ one }) => ({
  goal: one(goals, {
    fields: [activities.goalId],
    references: [goals.id],
  }),
  creator: one(users, {
    fields: [activities.creatorId],
    references: [users.id],
  }),
}));
