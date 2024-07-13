import { integer, pgEnum, pgTable, serial, timestamp, text } from 'drizzle-orm/pg-core';
import { users } from './user';
import { goals } from '../goal';
import { relations } from 'drizzle-orm';

export const recentSearchEnum = pgEnum('recent_search_type', ['text', 'goal', 'user']);

export const userRecentSearches = pgTable('user_recent_searches', {
  id: serial('id').primaryKey(),
  ownerId: integer('owner_id')
    .notNull()
    .references(() => users.id),
  type: recentSearchEnum('type').notNull(),
  text: text('text'),
  userId: integer('user_id').references(() => users.id),
  goalId: integer('goal_id').references(() => goals.id),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const userRecentSearchesRelations = relations(userRecentSearches, ({ one }) => ({
  owner: one(users, {
    fields: [userRecentSearches.ownerId],
    references: [users.id],
  }),
  user: one(users, {
    fields: [userRecentSearches.ownerId],
    references: [users.id],
  }),
  goal: one(goals, {
    fields: [userRecentSearches.goalId],
    references: [goals.id],
  }),
}));
