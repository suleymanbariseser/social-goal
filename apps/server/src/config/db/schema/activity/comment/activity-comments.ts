import {
  foreignKey,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { users } from '../../user';
import { activities } from '../activity';
import { InferInsertModel, InferSelectModel, relations } from 'drizzle-orm';
import { activityCommentLikes } from './activity-comment-likes';

export const activityComments = pgTable(
  'activity_comments',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id')
      .notNull()
      .references(() => users.id),
    activityId: integer('activity_id')
      .notNull()
      .references(() => activities.id),
    parentCommentId: integer('parent_comment_id'),
    content: text('content').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    parentCommentReference: foreignKey({
      columns: [table.parentCommentId],
      foreignColumns: [table.id],
      name: 'parent_comment_reference',
    }),
  })
);

export type ActivityComment = InferSelectModel<typeof activityComments>;
export type InsertActivityComment = InferInsertModel<typeof activityComments>;

export const activityCommentRelations = relations(activityComments, ({ one, many }) => ({
  user: one(users, {
    fields: [activityComments.userId],
    references: [users.id],
  }),
  likes: many(activityCommentLikes),
  activity: one(activities, {
    fields: [activityComments.activityId],
    references: [activities.id],
  }),
  parentComment: one(activityComments, {
    relationName: 'parentComment',
    fields: [activityComments.parentCommentId],
    references: [activityComments.id],
  }),
  childComments: many(activityComments, {
    relationName: 'parentComment',
  }),
}));
