import { InferModel, relations } from 'drizzle-orm';
import { pgTable, serial, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';
import { goals } from './goal';
import { activities } from './activity';

export const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    email: text('email').notNull(),
    password: text('password').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => {
    return {
      emailIdx: uniqueIndex('email_idx').on(table.email),
    };
  }
);

export const userRelations = relations(users, ({ many }) => ({
  goals: many(goals),
  activities: many(activities),
}));

export type User = InferModel<typeof users>;
