import { relations } from "drizzle-orm"
import { pgTable, text, varchar, integer, jsonb, boolean } from "drizzle-orm/pg-core"

export const user = pgTable('user', {
    id: varchar('id').primaryKey(),
    name: varchar('name').notNull(),
    email: varchar('email').notNull(),
    username: varchar('username').notNull().unique(),
    tagline: text('tagline'),
    bio: text('bio'),
    twitter: varchar('twitter'),
    github: varchar('github'),
    productHunt: varchar('product_hunt'),
    devto: varchar('devto'),
    link: text('link'),
    location: varchar('location'),
    profilePicture: text('profile_picture'),
    skills: text('skills').array(),
    theme: varchar('theme').notNull().default('neutral'),
    template: varchar('template', { enum: ['minimal', 'pristine', 'vibrant', 'elegant'] }).notNull().default('minimal'),
    font: jsonb('font').notNull().default({ heading: 'geist', content: 'geist' }),
    showGithub: boolean('show_github').notNull().default(false),
    showProductHunt: boolean('show_product_hunt').notNull().default(false),
    showDevto: boolean('show_devto').notNull().default(false),
})

export const projects = pgTable('projects', {
    id: varchar('id').primaryKey(),
    name: varchar('name').notNull(),
    description: text('description'),
    link: text('link'),
    github: text('github'),
    userId: varchar('user_id').notNull().references(() => user.id),
    logo: text('logo'),
    banner: text('banner'),
    category: varchar('category'),
    order: integer('order').default(0),
    clickCount: integer('click_count').default(0),
})

export const projectsClicks = pgTable('projects_clicks', {
    id: varchar('id').primaryKey(),
    projectId: varchar('project_id').notNull().references(() => projects.id),
    timestamp: integer('timestamp').notNull(),
})

export const profileVisits = pgTable('profile_visits', {
    id: varchar('id').primaryKey(),
    userId: varchar('user_id').notNull().references(() => user.id),
    timestamp: integer('timestamp').notNull(),
})

export const userProjectRelation = relations(user, ({ many }) => ({
    projects: many(projects),
}))

export const projectUserRelation = relations(projects, ({ one }) => ({
    user: one(user, {
        fields: [projects.userId],
        references: [user.id],
    }),
}))