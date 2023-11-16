import { InferModel, relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { goals } from '../goal';
import { users } from '../user';
import { activityLikes } from './activity-likes';

export const activities = pgTable('activities', {
  id: serial('id').primaryKey(),
  creatorId: integer('creator_id')
    .notNull()
    .references(() => users.id),
  goalId: integer('goal_id')
    .notNull()
    .references(() => goals.id),
  content: text('content').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).defaultNow().notNull(),
});

export type Activity = InferModel<typeof activities>;

export const activityRelations = relations(activities, ({ one, many }) => ({
  goal: one(goals, {
    fields: [activities.goalId],
    references: [goals.id],
  }),
  creator: one(users, {
    fields: [activities.creatorId],
    references: [users.id],
  }),
  likedBy: many(activityLikes),
}));
