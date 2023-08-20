import { InferModel, relations } from 'drizzle-orm';
import { pgTable, serial, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';
import { goals } from '../goal';
import { activities } from '../activity';
import { userSocialLinks } from './user-social-link';
import { userRelationships } from './user-relationships';

export const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    image: text('image'),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    email: text('email').notNull(),
    description: text('description'),
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
  socialLinks: many(userSocialLinks),
  followers: many(userRelationships, { relationName: 'follower' }),
  followings: many(userRelationships, { relationName: 'following' }),
}));

export type User = InferModel<typeof users>;
