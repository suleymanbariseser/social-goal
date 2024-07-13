import { relations } from "drizzle-orm/relations";
import { activities, activity_assets, users, activity_comments, activity_likes, goals, assets, user_relationship, user_social_link, activity_comment_likes } from "./schema";

export const activity_assetsRelations = relations(activity_assets, ({one}) => ({
	activity: one(activities, {
		fields: [activity_assets.activity_id],
		references: [activities.id]
	}),
}));

export const activitiesRelations = relations(activities, ({one, many}) => ({
	activity_assets: many(activity_assets),
	activity_comments: many(activity_comments),
	activity_likes: many(activity_likes),
	user: one(users, {
		fields: [activities.creator_id],
		references: [users.id]
	}),
	goal: one(goals, {
		fields: [activities.goal_id],
		references: [goals.id]
	}),
}));

export const activity_commentsRelations = relations(activity_comments, ({one, many}) => ({
	user: one(users, {
		fields: [activity_comments.user_id],
		references: [users.id]
	}),
	activity_comment: one(activity_comments, {
		fields: [activity_comments.parent_comment_id],
		references: [activity_comments.id],
		relationName: "activity_comments_parent_comment_id_activity_comments_id"
	}),
	activity_comments: many(activity_comments, {
		relationName: "activity_comments_parent_comment_id_activity_comments_id"
	}),
	activity: one(activities, {
		fields: [activity_comments.activity_id],
		references: [activities.id]
	}),
	activity_comment_likes: many(activity_comment_likes),
}));

export const usersRelations = relations(users, ({many}) => ({
	activity_comments: many(activity_comments),
	activity_likes: many(activity_likes),
	goals: many(goals),
	assets: many(assets),
	user_relationships_follower_id: many(user_relationship, {
		relationName: "user_relationship_follower_id_users_id"
	}),
	user_relationships_followed_id: many(user_relationship, {
		relationName: "user_relationship_followed_id_users_id"
	}),
	user_social_links: many(user_social_link),
	activities: many(activities),
	activity_comment_likes: many(activity_comment_likes),
}));

export const activity_likesRelations = relations(activity_likes, ({one}) => ({
	user: one(users, {
		fields: [activity_likes.user_id],
		references: [users.id]
	}),
	activity: one(activities, {
		fields: [activity_likes.activity_id],
		references: [activities.id]
	}),
}));

export const goalsRelations = relations(goals, ({one, many}) => ({
	user: one(users, {
		fields: [goals.creator_id],
		references: [users.id]
	}),
	activities: many(activities),
}));

export const assetsRelations = relations(assets, ({one}) => ({
	user: one(users, {
		fields: [assets.creator_id],
		references: [users.id]
	}),
}));

export const user_relationshipRelations = relations(user_relationship, ({one}) => ({
	user_follower_id: one(users, {
		fields: [user_relationship.follower_id],
		references: [users.id],
		relationName: "user_relationship_follower_id_users_id"
	}),
	user_followed_id: one(users, {
		fields: [user_relationship.followed_id],
		references: [users.id],
		relationName: "user_relationship_followed_id_users_id"
	}),
}));

export const user_social_linkRelations = relations(user_social_link, ({one}) => ({
	user: one(users, {
		fields: [user_social_link.user_id],
		references: [users.id]
	}),
}));

export const activity_comment_likesRelations = relations(activity_comment_likes, ({one}) => ({
	user: one(users, {
		fields: [activity_comment_likes.user_id],
		references: [users.id]
	}),
	activity_comment: one(activity_comments, {
		fields: [activity_comment_likes.comment_id],
		references: [activity_comments.id]
	}),
}));