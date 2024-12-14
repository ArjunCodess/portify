import { pgTable, text, varchar } from "drizzle-orm/pg-core"

export const user = pgTable('user', {
    id: varchar('id').primaryKey(),
    name: varchar('name').notNull(),
    email: varchar('email').notNull(),
    username: varchar('username').notNull(),
    tagline: text('tagline'),
    bio: text('bio'),
    twitter: varchar('twitter'),
    github: varchar('github'),
    link: text('link'),
    location: varchar('location'),
    profilePicture: text('profile_picture'),
})