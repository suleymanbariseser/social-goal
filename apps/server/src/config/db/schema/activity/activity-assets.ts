import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { activities } from './activity';
import { relations } from 'drizzle-orm';

export const activityAssets = pgTable('activity_assets', {
  id: serial('id').primaryKey(),
  activityId: integer('activity_id')
    .notNull()
    .references(() => activities.id),
  uri: text('content').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const activityAssetsRelations = relations(activityAssets, ({ one }) => ({
  activity: one(activities, {
    fields: [activityAssets.activityId],
    references: [activities.id],
  }),
}));
