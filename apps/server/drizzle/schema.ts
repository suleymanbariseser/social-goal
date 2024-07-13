import { pgTable, pgEnum, serial, text, varchar, timestamp, foreignKey, integer, unique, uniqueIndex } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const asset_type = pgEnum("asset_type", ['image', 'video', 'gif'])
export const recent_search_type = pgEnum("recent_search_type", ['text', 'goal', 'user'])


export const user_verification = pgTable("user_verification", {
	id: serial("id").primaryKey().notNull(),
	first_name: text("first_name").notNull(),
	last_name: text("last_name").notNull(),
	email: text("email").notNull(),
	code: varchar("code").notNull(),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	expires_at: timestamp("expires_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const activity_assets = pgTable("activity_assets", {
	id: serial("id").primaryKey().notNull(),
	activity_id: integer("activity_id").notNull().references(() => activities.id),
	content: text("content").notNull(),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const users = pgTable("users", {
	id: serial("id").primaryKey().notNull(),
	image: text("image"),
	first_name: text("first_name").notNull(),
	last_name: text("last_name").notNull(),
	email: text("email").notNull(),
	description: text("description"),
	password: text("password").notNull(),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		users_email_unique: unique("users_email_unique").on(table.email),
	}
});

export const activity_comments = pgTable("activity_comments", {
	id: serial("id").primaryKey().notNull(),
	user_id: integer("user_id").notNull().references(() => users.id),
	activity_id: integer("activity_id").notNull().references(() => activities.id, { onDelete: "cascade" } ),
	parent_comment_id: integer("parent_comment_id"),
	content: text("content").notNull(),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		parent_comment_reference: foreignKey({
			columns: [table.parent_comment_id],
			foreignColumns: [table.id],
			name: "parent_comment_reference"
		}),
	}
});

export const activity_likes = pgTable("activity_likes", {
	id: serial("id").primaryKey().notNull(),
	user_id: integer("user_id").notNull().references(() => users.id),
	activity_id: integer("activity_id").notNull().references(() => activities.id, { onDelete: "cascade" } ),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		user_activity_idx: uniqueIndex("user_activity_idx").using("btree", table.user_id, table.activity_id),
	}
});

export const goals = pgTable("goals", {
	id: serial("id").primaryKey().notNull(),
	creator_id: integer("creator_id").notNull().references(() => users.id),
	title: text("title").notNull(),
	description: text("description").notNull(),
	start_date: timestamp("start_date", { withTimezone: true, mode: 'string' }).notNull(),
	end_date: timestamp("end_date", { withTimezone: true, mode: 'string' }).notNull(),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const assets = pgTable("assets", {
	id: serial("id").primaryKey().notNull(),
	creator_id: integer("creator_id").notNull().references(() => users.id),
	url: text("url").notNull(),
	type: asset_type("type").notNull(),
	size: integer("size").notNull(),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	expires_at: timestamp("expires_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const user_relationship = pgTable("user_relationship", {
	id: serial("id").primaryKey().notNull(),
	follower_id: integer("follower_id").notNull().references(() => users.id),
	followed_id: integer("followed_id").notNull().references(() => users.id),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		user_relation_idx: uniqueIndex("user_relation_idx").using("btree", table.follower_id, table.followed_id),
	}
});

export const user_social_link = pgTable("user_social_link", {
	id: serial("id").primaryKey().notNull(),
	link: text("link").notNull(),
	user_id: integer("user_id").notNull().references(() => users.id),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const activities = pgTable("activities", {
	id: serial("id").primaryKey().notNull(),
	creator_id: integer("creator_id").notNull().references(() => users.id),
	goal_id: integer("goal_id").notNull().references(() => goals.id),
	content: text("content").notNull(),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	expires_at: timestamp("expires_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	deleted_at: timestamp("deleted_at", { withTimezone: true, mode: 'string' }),
});

export const activity_comment_likes = pgTable("activity_comment_likes", {
	id: serial("id").primaryKey().notNull(),
	user_id: integer("user_id").notNull().references(() => users.id),
	comment_id: integer("comment_id").notNull().references(() => activity_comments.id, { onDelete: "cascade" } ),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		user_comment_idx: uniqueIndex("user_comment_idx").using("btree", table.user_id, table.comment_id),
	}
});