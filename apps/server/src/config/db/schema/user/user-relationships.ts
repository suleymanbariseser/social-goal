import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';
import { users } from './user';

export const userRelationships = pgTable(
  'user_relationship',
  {
    id: serial('id').primaryKey(),
    followerId: integer('follower_id')
      .notNull()
      .references(() => users.id),
    followingId: integer('followed_id')
      .notNull()
      .references(() => users.id),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => {
    return {
      followerIdx: uniqueIndex('follower_idx').on(table.followerId),
      followingIdx: uniqueIndex('following_idx').on(table.followingId),
    };
  }
);

export const userRelationshipsRelations = relations(userRelationships, ({ one }) => ({
  follower: one(users, {
    fields: [userRelationships.followerId],
    references: [users.id],
    relationName: 'follower',
  }),
  following: one(users, {
    fields: [userRelationships.followingId],
    references: [users.id],
    relationName: 'following',
  }),
}));
