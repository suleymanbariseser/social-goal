import { InferModel, relations } from 'drizzle-orm';
import { pgTable, serial, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';
import { goals } from '../goal';
import { activities } from '../activity';
import { userSocialLinks } from './user-social-link';
import { userRelationships } from './user-relationships';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  image: text('image'),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull().unique(),
  description: text('description'),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
  goals: many(goals),
  activities: many(activities),
  socialLinks: many(userSocialLinks),
  likedActivities: many(activities),

  // ? the relation name is reverse because the followers are people who following me
  followers: many(userRelationships, { relationName: 'following' }),
  followings: many(userRelationships, { relationName: 'follower' }),
}));

export type User = InferModel<typeof users>;
