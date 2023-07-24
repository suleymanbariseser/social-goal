import { InferModel } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const goals = pgTable('goals', {
  id: serial('id').primaryKey(),
  creatorId: integer('creator_id').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type Goal = InferModel<typeof goals>;
