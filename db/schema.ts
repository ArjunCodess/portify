import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  varchar,
  integer,
  jsonb,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: varchar("id").primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull()
    .default(false),
  image: text("image"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull()
    .default(new Date()),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull()
    .default(new Date()),
  username: varchar("username").notNull().unique(),
  tagline: text("tagline"),
  bio: text("bio"),
  twitter: varchar("twitter"),
  github: varchar("github"),
  productHunt: varchar("product_hunt"),
  devto: varchar("devto"),
  medium: varchar("medium"),
  link: text("link"),
  location: varchar("location"),
  profilePicture: text("profile_picture"),
  skills: text("skills").array(),
  theme: varchar("theme").notNull().default("neutral"),
  template: varchar("template", {
    enum: ["minimal", "pristine", "vibrant", "elegant"],
  })
    .notNull()
    .default("minimal"),
  font: jsonb("font").notNull().default({ heading: "geist", content: "geist" }),
  showGithub: boolean("show_github").notNull().default(false),
  showProductHunt: boolean("show_product_hunt").notNull().default(false),
  showDevto: boolean("show_devto").notNull().default(false),
  showMedium: boolean("show_medium").notNull().default(false),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey(),
  name: varchar("name").notNull(),
  description: text("description"),
  link: text("link"),
  github: text("github"),
  userId: varchar("user_id")
    .notNull()
    .references(() => user.id),
  logo: text("logo"),
  banner: text("banner"),
  category: varchar("category"),
  order: integer("order").default(0),
  clickCount: integer("click_count").default(0),
});

export const projectsClicks = pgTable("projects_clicks", {
  id: varchar("id").primaryKey(),
  projectId: varchar("project_id")
    .notNull()
    .references(() => projects.id),
  timestamp: integer("timestamp").notNull(),
});

export const profileVisits = pgTable("profile_visits", {
  id: varchar("id").primaryKey(),
  userId: varchar("user_id")
    .notNull()
    .references(() => user.id),
  timestamp: integer("timestamp").notNull(),
});

export const userProjectRelation = relations(user, ({ many }) => ({
  projects: many(projects),
}));

export const projectUserRelation = relations(projects, ({ one }) => ({
  user: one(user, {
    fields: [projects.userId],
    references: [user.id],
  }),
}));

export const schema = {
  user,
  session,
  account,
  verification,
  projects,
  projectsClicks,
  profileVisits,
  userProjectRelation,
  projectUserRelation,
};