import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { users } from './user';

export const userSocialLinks = pgTable('user_social_link', {
  id: serial('id').primaryKey(),
  link: text('link').notNull(),
  userId: integer('user_id').notNull().references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const userSocialLinksRelations = relations(userSocialLinks, ({ one }) => ({
    user: one(users, {
      fields: [userSocialLinks.userId],
      references: [users.id],
    }),
  }));