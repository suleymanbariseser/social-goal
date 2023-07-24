import { InferModel, relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { users } from './user';

export const goals = pgTable('goals', {
  id: serial('id').primaryKey(),
  creatorId: integer('creator_id').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const goalRelations = relations(goals, ({ one }) => ({
  creator: one(users, {
    fields: [goals.creatorId],
    references: [users.id],
  }),
}));

export type Goal = InferModel<typeof goals>;
