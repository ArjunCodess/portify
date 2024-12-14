import { pgTable, uuid, varchar } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const user = pgTable("user", {
	id: uuid().primaryKey().notNull(),
	name: varchar().notNull(),
	email: varchar().notNull(),
	username: varchar().notNull(),
});
