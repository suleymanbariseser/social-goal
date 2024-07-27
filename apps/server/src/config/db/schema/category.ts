import { relations } from 'drizzle-orm';
import { pgTable, serial, text } from 'drizzle-orm/pg-core';
import { goals } from './goal';

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  goals: many(goals),
}));
