import { asc, desc, isNotNull, sql } from "drizzle-orm";
import { SITE_URL } from "@/config/site";
import { db } from "@/db";
import {
  education,
  experience,
  profile,
  socialLink,
  techTag,
} from "@/db/schema";
import type { Locale } from "@/lib/markdown/types";

// Single data source for the home page and its markdown mirror (S8/S10): the
// queries and the locale rule ((isEs ? xEs : null) ?? x) live here once, so the
// HTML page and the mirror cannot drift apart.

export type SocialLinkRow = { platform: string; url: string };
export type TechTagRow = {
  name: string;
  category: string;
  iconUrl: string | null;
  featured: boolean;
  order: number;
};
export type ExperienceRow = {
  company: string;
  link: string | null;
  role: string;
  roleEs: string | null;
  startDate: string;
  endDate: string | null;
  description: string;
  descriptionEs: string | null;
  isCurrent: boolean;
  order: number;
};
export type EducationRow = {
  institution: string;
  link: string | null;
  degree: string;
  degreeEs: string | null;
  startDate: string;
  endDate: string | null;
  description: string;
  descriptionEs: string | null;
  order: number;
};
export type ProfileRow = {
  heroTitle: string;
  heroTagline: string;
  heroTaglineEs: string | null;
  statusLineEs: string | null;
  aboutText: string;
  statusLine: string;
  yearsExp: number;
  contactEmail: string;
  seoTitle: string;
  seoDescription: string;
  seoUrl: string;
};

export type PortfolioContent = {
  profile: ProfileRow | null;
  socials: SocialLinkRow[];
  techs: TechTagRow[];
  experiences: ExperienceRow[];
  educations: EducationRow[];
};

// Fallbacks the page's head and hero render; the mirror resolves them from here.
export const DEFAULT_SEO_TITLE = "Facundo Majda — AI/ML & Automation Engineer";
export const DEFAULT_SEO_DESCRIPTION =
  "AI/ML & Automation Engineer. I design and ship production AI systems — RAG pipelines, LLM agents, computer vision, and the backend that holds them up.";
export const FALLBACK_HERO_TAGLINE =
  "SWE | Data & AI-Driven Apps | FDE | Full-Stack + Automation";
export const FALLBACK_STATUS_LINE =
  "Available for remote engineering roles and selected projects";

export function resolveSeo(row: ProfileRow | null) {
  return {
    title: row?.seoTitle ?? DEFAULT_SEO_TITLE,
    description: row?.seoDescription ?? DEFAULT_SEO_DESCRIPTION,
    url: row?.seoUrl ?? SITE_URL,
  };
}

function localized(primary: string, es: string | null, isEs: boolean): string {
  return (isEs ? es : null) ?? primary;
}

const MONTH_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function fmtMonth(date: Date) {
  return MONTH_SHORT[date.getUTCMonth()];
}

function fmtYear(date: Date) {
  return String(date.getUTCFullYear());
}

// Shared with the page and the mirror so both print the same date strings.
export function fmtRange(start: string, end: string | null, isCurrent: boolean) {
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : null;
  const startMonth = fmtMonth(startDate);
  const startYear = fmtYear(startDate);
  if (!endDate) {
    if (isCurrent) return `${startMonth} ${startYear} — Present`;
    return `${startMonth} ${startYear} —`;
  }
  const endMonth = fmtMonth(endDate);
  const endYear = fmtYear(endDate);
  if (startMonth === endMonth && startYear === endYear) {
    return `${startMonth} ${startYear}`;
  }
  if (startYear === endYear) return `${startMonth} — ${endMonth} ${endYear}`;
  return `${startMonth} ${startYear} — ${endMonth} ${endYear}`;
}

export async function loadPortfolioContent(
  locale: Locale,
): Promise<PortfolioContent> {
  const isEs = locale === "es";

  const profileRows = await db
    .select({
      heroTitle: profile.heroTitle,
      heroTagline: profile.heroTagline,
      heroTaglineEs: profile.heroTaglineEs,
      aboutText: profile.aboutText,
      statusLine: profile.statusLine,
      statusLineEs: profile.statusLineEs,
      yearsExp: profile.yearsExp,
      contactEmail: profile.contactEmail,
      seoTitle: profile.seoTitle,
      seoDescription: profile.seoDescription,
      seoUrl: profile.seoUrl,
    })
    .from(profile)
    .limit(1);
  const profileRow = profileRows[0] as ProfileRow | undefined;

  const socialRows = await db
    .select()
    .from(socialLink)
    .orderBy(asc(socialLink.order));

  const techRows = await db
    .select()
    .from(techTag)
    .where(isNotNull(techTag.iconUrl))
    .orderBy(asc(techTag.category), asc(techTag.order));

  const expRows = await db
    .select()
    .from(experience)
    .orderBy(
      desc(sql`coalesce(${experience.endDate}, ${experience.startDate})`),
      asc(experience.order),
    );

  const eduRows = await db.select().from(education).orderBy(asc(education.order));

  return {
    // `_es` fields stay in the shape; the localized column wins when the row
    // has it, exactly as the page rendered before this loader existed.
    profile: profileRow
      ? {
          ...profileRow,
          heroTagline: localized(profileRow.heroTagline, profileRow.heroTaglineEs, isEs),
          statusLine: localized(profileRow.statusLine, profileRow.statusLineEs, isEs),
        }
      : null,
    socials: socialRows as SocialLinkRow[],
    techs: techRows as TechTagRow[],
    experiences: expRows.map((r) => ({
      ...r,
      startDate: r.startDate.toISOString(),
      endDate: r.endDate ? r.endDate.toISOString() : null,
      role: localized(r.role, r.roleEs, isEs),
      description: localized(r.description, r.descriptionEs, isEs),
    })) as unknown as ExperienceRow[],
    educations: eduRows.map((r) => ({
      ...r,
      startDate: r.startDate.toISOString(),
      endDate: r.endDate ? r.endDate.toISOString() : null,
      degree: localized(r.degree, r.degreeEs, isEs),
      description: localized(r.description, r.descriptionEs, isEs),
    })) as unknown as EducationRow[],
  };
}
