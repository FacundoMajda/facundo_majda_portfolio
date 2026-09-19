import {
  pgTable,
  text,
  varchar,
  integer,
  boolean,
  timestamp,
  jsonb,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

const now = () => new Date();

// =====================================================================
// Better Auth tables
// =====================================================================

export const user = pgTable("user", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (t) => ({ userIdIdx: index("session_user_id_idx").on(t.userId) }),
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
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
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => ({ userIdIdx: index("account_user_id_idx").on(t.userId) }),
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => ({ identifierIdx: index("verification_identifier_idx").on(t.identifier) }),
);

// =====================================================================
// Portfolio content tables
// =====================================================================

export const profile = pgTable("profile", {
  id: text("id").primaryKey().$defaultFn(() => "singleton"),
  heroTitle: text("hero_title").notNull(),
  heroTagline: text("hero_tagline").notNull(),
  aboutText: text("about_text").notNull(),
  statusLine: text("status_line").notNull(),
  yearsExp: integer("years_exp").notNull(),
  contactEmail: text("contact_email").notNull(),
  seoTitle: text("seo_title").notNull(),
  seoDescription: text("seo_description").notNull(),
  seoUrl: text("seo_url").notNull(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => now()),
});

export const socialLink = pgTable(
  "social_link",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    platform: varchar("platform", { length: 32 }).notNull(),
    url: text("url").notNull(),
    order: integer("order").notNull().default(0),
  },
  (t) => ({ platformIdx: uniqueIndex("social_link_platform_idx").on(t.platform) }),
);

export const techTag = pgTable(
  "tech_tag",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: varchar("name", { length: 64 }).notNull(),
    category: varchar("category", { length: 32 }).notNull(),
    iconUrl: text("icon_url"),
    featured: boolean("featured").notNull().default(true),
    order: integer("order").notNull().default(0),
  },
  (t) => ({
    categoryIdx: index("tech_tag_category_idx").on(t.category),
    featuredIdx: index("tech_tag_featured_idx").on(t.featured),
  }),
);

export const experience = pgTable("experience", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  company: varchar("company", { length: 128 }).notNull(),
  link: text("link"),
  role: varchar("role", { length: 128 }).notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  description: text("description").notNull(),
  isCurrent: boolean("is_current").notNull().default(false),
  order: integer("order").notNull().default(0),
});

export const education = pgTable("education", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  institution: varchar("institution", { length: 256 }).notNull(),
  link: text("link"),
  degree: varchar("degree", { length: 256 }).notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  description: text("description").notNull(),
  order: integer("order").notNull().default(0),
});

export const project = pgTable(
  "project",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    slug: varchar("slug", { length: 128 }).notNull().unique(),
    title: varchar("title", { length: 256 }).notNull(),
    category: varchar("category", { length: 128 }),
    tech: jsonb("tech").$type<string[]>().notNull().default([]),
    shortDesc: text("short_desc").notNull(),
    longDesc: text("long_desc").notNull(),
    repoUrl: text("repo_url"),
    caseStudyUrl: text("case_study_url"),
    color: varchar("color", { length: 256 }),
    images: jsonb("images").$type<string[]>().notNull().default([]),
    metrics: jsonb("metrics").$type<Record<string, unknown>>(),
    isClientWork: boolean("is_client_work").notNull().default(false),
    featured: boolean("featured").notNull().default(true),
    order: integer("order").notNull().default(0),
    publishedAt: timestamp("published_at"),
  },
  (t) => ({
    slugIdx: uniqueIndex("project_slug_idx").on(t.slug),
    publishedIdx: index("project_published_idx").on(t.publishedAt),
  }),
);

export const writingEntry = pgTable(
  "writing_entry",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    slug: varchar("slug", { length: 256 }).notNull().unique(),
    title: varchar("title", { length: 256 }).notNull(),
    summary: text("summary").notNull(),
    url: text("url").notNull(),
    platform: varchar("platform", { length: 32 }).notNull(),
    language: varchar("language", { length: 8 }).notNull().default("es"),
    publishedAt: timestamp("published_at").notNull(),
  },
  (t) => ({
    slugIdx: uniqueIndex("writing_entry_slug_idx").on(t.slug),
    languageIdx: index("writing_entry_language_idx").on(t.language),
  }),
);

export const appearance = pgTable("appearance", {
  id: text("id").primaryKey().$defaultFn(() => "singleton"),
  // Typography
  bodyFont: text("body_font").notNull().default("Inter"),
  headingFont: text("heading_font").notNull().default("Inter"),
  bodyFontUrl: text("body_font_url").notNull().default(""),
  headingFontUrl: text("heading_font_url").notNull().default(""),
  // Density
  density: varchar("density", { length: 16 }).notNull().default("comfortable"), // compact | comfortable | spacious
  sectionSpacing: integer("section_spacing").notNull().default(8), // rem scale
  // Color tokens (overrides)
  accentColor: varchar("accent_color", { length: 16 }).notNull().default("#3b82f6"),
  // Hero visibility
  showHero: boolean("show_hero").notNull().default(true),
  showAbout: boolean("show_about").notNull().default(true),
  showStack: boolean("show_stack").notNull().default(true),
  showExperience: boolean("show_experience").notNull().default(true),
  showEducation: boolean("show_education").notNull().default(true),
  showProjects: boolean("show_projects").notNull().default(true),
  showWriting: boolean("show_writing").notNull().default(true),
  // Section order (array of section IDs)
  sectionOrder: jsonb("section_order").$type<string[]>().notNull().default([]),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => now()),
});

// =====================================================================
// Relations (for Drizzle relational queries)
// =====================================================================

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, { fields: [session.userId], references: [user.id] }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id] }),
}));

// =====================================================================
// Type exports
// =====================================================================

export type Profile = typeof profile.$inferSelect;
export type NewProfile = typeof profile.$inferInsert;
export type SocialLink = typeof socialLink.$inferSelect;
export type TechTag = typeof techTag.$inferSelect;
export type Experience = typeof experience.$inferSelect;
export type Education = typeof education.$inferSelect;
export type Project = typeof project.$inferSelect;
export type WritingEntry = typeof writingEntry.$inferSelect;
export type Appearance = typeof appearance.$inferSelect;
