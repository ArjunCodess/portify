import { pgTable, foreignKey, varchar, text, integer } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const projects = pgTable("projects", {
	id: varchar().primaryKey().notNull(),
	name: varchar().notNull(),
	description: text(),
	link: text(),
	userId: varchar("user_id").notNull(),
	logo: text(),
	banner: text(),
	category: varchar(),
	order: integer().default(0),
	github: text(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "projects_user_id_user_id_fk"
		}),
]);

export const user = pgTable("user", {
	id: varchar().primaryKey().notNull(),
	name: varchar().notNull(),
	email: varchar().notNull(),
	username: varchar().notNull(),
	tagline: text(),
	bio: text(),
	twitter: varchar(),
	github: varchar(),
	link: text(),
	location: varchar(),
	profilePicture: text("profile_picture"),
	skills: text().array(),
	theme: varchar().default('neutral').notNull(),
});
