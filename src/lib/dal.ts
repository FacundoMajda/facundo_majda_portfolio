import { unstable_cache } from "next/cache";
import { db } from "@/db";
import {
  profile,
  socialLink,
  techTag,
  experience,
  education,
  project,
  writingEntry,
} from "@/db/schema";
import { asc, desc, eq, isNotNull, sql } from "drizzle-orm";

// =====================================================================
// Cached data access (revalidate every 5 minutes)
// =====================================================================

export const getProfile = unstable_cache(
  async () => {
    const row = await db.select().from(profile).where(eq(profile.id, "singleton")).limit(1);
    if (row.length === 0) return null;
    return row[0];
  },
  ["profile"],
  { revalidate: 300, tags: ["profile"] },
);

export const getSocialLinks = unstable_cache(
  async () =>
    db.select().from(socialLink).orderBy(asc(socialLink.order)),
  ["social-links"],
  { revalidate: 300, tags: ["social-links"] },
);

export const getFeaturedTechTags = unstable_cache(
  async () =>
    db
      .select()
      .from(techTag)
      .where(eq(techTag.featured, true))
      .orderBy(asc(techTag.category), asc(techTag.order)),
  ["featured-tech-tags"],
  { revalidate: 300, tags: ["tech-tags"] },
);

export const getAllTechTags = unstable_cache(
  async () =>
    db.select().from(techTag).orderBy(asc(techTag.category), asc(techTag.order)),
  ["all-tech-tags"],
  { revalidate: 300, tags: ["tech-tags"] },
);

export const getExperience = unstable_cache(
  async () =>
    db
      .select()
      .from(experience)
      .orderBy(
        desc(sql`coalesce(${experience.endDate}, ${experience.startDate})`),
        asc(experience.order),
      ),
  ["experience"],
  { revalidate: 300, tags: ["experience"] },
);

export const getEducation = unstable_cache(
  async () =>
    db.select().from(education).orderBy(asc(education.order)),
  ["education"],
  { revalidate: 300, tags: ["education"] },
);

export const getPublishedProjects = unstable_cache(
  async () =>
    db
      .select()
      .from(project)
      .where(isNotNull(project.publishedAt))
      .orderBy(asc(project.order)),
  ["published-projects"],
  { revalidate: 300, tags: ["projects"] },
);

export const getAllProjects = unstable_cache(
  async () =>
    db.select().from(project).orderBy(asc(project.order)),
  ["all-projects"],
  { revalidate: 300, tags: ["projects"] },
);

export const getWritingEntries = unstable_cache(
  async () =>
    db
      .select()
      .from(writingEntry)
      .orderBy(desc(writingEntry.publishedAt)),
  ["writing-entries"],
  { revalidate: 300, tags: ["writing"] },
);

// =====================================================================
// Tag-based revalidation helper (call after admin mutations)
// =====================================================================

export async function revalidateAll() {
  const { revalidateTag } = await import("next/cache");
  revalidateTag("profile", "max");
  revalidateTag("social-links", "max");
  revalidateTag("tech-tags", "max");
  revalidateTag("experience", "max");
  revalidateTag("education", "max");
  revalidateTag("projects", "max");
  revalidateTag("writing", "max");
}
