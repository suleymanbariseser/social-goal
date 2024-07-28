import { integer, pgTable, serial, uniqueIndex } from 'drizzle-orm/pg-core';
import { categories } from './category';
import { goals } from './goal';
import { relations } from 'drizzle-orm';

export const goalCategories = pgTable(
  'goal_categories',
  {
    id: serial('id').primaryKey(),
    categoryId: integer('category_id')
      .notNull()
      .references(() => categories.id),
    goalId: integer('goal_id')
      .notNull()
      .references(() => goals.id),
  },
  (table) => ({
    goalCategoryIdx: uniqueIndex('goal_category_idx').on(table.goalId, table.categoryId),
  })
);

export const goalCategoriesRelations = relations(goalCategories, ({ one }) => ({
  category: one(categories, {
    fields: [goalCategories.categoryId],
    references: [categories.id],
  }),
  goal: one(goals, {
    fields: [goalCategories.goalId],
    references: [goals.id],
  }),
}));
