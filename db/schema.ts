import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core"

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

export const projects = pgTable('projects', {
    id: varchar('id').primaryKey(),
    name: varchar('name').notNull(),
    description: text('description'),
    link: text('link'),
    userId: varchar('user_id').notNull().references(() => user.id),
    logo: text('logo'),
    banner: text('banner'),
    category: varchar('category'),
    order: integer('order').default(0),
})