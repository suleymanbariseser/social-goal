import { integer, pgTable, serial, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';
import { users } from '../user';
import { activities } from './activity';
import { relations } from 'drizzle-orm';

export const activityLikes = pgTable(
  'activity_likes',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id')
      .notNull()
      .references(() => users.id),
    activityId: integer('activity_id')
      .notNull()
      .references(() => activities.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => ({
    userActivityIdx: uniqueIndex('user_activity_idx').on(table.userId, table.activityId),
  })
);

export const activityLikeRelations = relations(activityLikes, ({ one }) => ({
  user: one(users, {
    fields: [activityLikes.userId],
    references: [users.id],
  }),
  activity: one(activities, {
    fields: [activityLikes.activityId],
    references: [activities.id],
  }),
}));
