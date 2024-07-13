import { InferModel, relations } from 'drizzle-orm';
import { pgTable, serial, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';
import { goals } from '../goal';
import { activities, activityCommentLikes, activityLikes } from '../activity';
import { userSocialLinks } from './user-social-link';
import { userRelationships } from './user-relationships';
import { activityComments } from '../activity/comment/activity-comments';
import { userRecentSearches } from './user-recent-searches';

export const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    image: text('image'),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    email: text('email').notNull().unique(),
    description: text('description'),
    password: text('password').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  }
);

export const userRelations = relations(users, ({ many }) => ({
  goals: many(goals),
  socialLinks: many(userSocialLinks),
  activities: many(activities),
  likes: many(activityLikes),
  comments: many(activityComments),

  commentLikes: many(activityCommentLikes),

  recentSearches: many(userRecentSearches),

  // ? the relation name is reverse because the followers are people who following me
  followers: many(userRelationships, { relationName: 'following' }),
  followings: many(userRelationships, { relationName: 'follower' }),
}));

export type User = InferModel<typeof users>;
