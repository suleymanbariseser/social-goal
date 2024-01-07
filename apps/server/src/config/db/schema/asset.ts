import { integer, pgEnum, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { users } from './user';
import { relations } from 'drizzle-orm';

export const assetTypeEnum = pgEnum('asset_type', ['image', 'video', 'gif']);

export const assets = pgTable('assets', {
  id: serial('id').primaryKey(),
  creatorId: integer('creator_id')
    .notNull()
    .references(() => users.id),
  url: text('url').notNull(),
  type: assetTypeEnum('type').notNull(),
  size: integer('size').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).defaultNow().notNull(),
});

export const assetRelations = relations(assets, ({ one }) => ({
  creator: one(users, {
    fields: [assets.creatorId],
    references: [users.id],
  }),
}));

export type Asset = typeof assets.$inferSelect;
