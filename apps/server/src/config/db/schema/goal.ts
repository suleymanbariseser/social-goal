import { InferSelectModel, relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { users } from './user';
import { activities } from './activity';

export const goals = pgTable('goals', {
  id: serial('id').primaryKey(),
  creatorId: integer('creator_id')
    .notNull()
    .references(() => users.id),
  title: text('title').notNull(),
  description: text('description').notNull(),
  startDate: timestamp('start_date', { withTimezone: true }).notNull(),
  endDate: timestamp('end_date', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const goalRelations = relations(goals, ({ one, many }) => ({
  creator: one(users, {
    fields: [goals.creatorId],
    references: [users.id],
  }),
  activities: many(activities),
}));

export type Goal = InferSelectModel<typeof goals>;
