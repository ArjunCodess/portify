import { relations } from "drizzle-orm/relations";
import { user, projects } from "./schema";

export const projectsRelations = relations(projects, ({one}) => ({
	user: one(user, {
		fields: [projects.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	projects: many(projects),
}));