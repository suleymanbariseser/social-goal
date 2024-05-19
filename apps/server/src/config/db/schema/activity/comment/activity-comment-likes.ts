import { integer, pgTable, serial, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';
import { users } from '../../user';
import { activityComments } from './activity-comments';
import { relations } from 'drizzle-orm';

export const activityCommentLikes = pgTable(
  'activity_comment_likes',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id')
      .notNull()
      .references(() => users.id),
    commentId: integer('comment_id')
      .notNull()
      .references(() => activityComments.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    userCommentIdx: uniqueIndex('user_comment_idx').on(table.userId, table.commentId),
  })
);

export const activityCommentLikesRelations = relations(activityCommentLikes, ({ one }) => ({
  user: one(users, {
    fields: [activityCommentLikes.userId],
    references: [users.id],
  }),
  comment: one(activityComments, {
    fields: [activityCommentLikes.commentId],
    references: [activityComments.id],
  }),
}));
