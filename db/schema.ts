import { pgTable, uuid, varchar } from "drizzle-orm/pg-core"

export const user = pgTable('user', {
    id: uuid('id').primaryKey(),
    name: varchar('name').notNull(),
    email: varchar('email').notNull(),
    username: varchar('username').notNull(),
})