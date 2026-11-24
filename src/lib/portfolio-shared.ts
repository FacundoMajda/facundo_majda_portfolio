import { SITE_URL } from "@/config/site";
import type { Locale } from "@/lib/markdown/types";

// Isomorphic pieces of the portfolio model: row shapes, SEO resolution,
// fallbacks and date formatting used by both the server loader and the
// browser bundle. Keep this module free of server-only imports (no @/db):
// the db module throws without DATABASE_URL, and pulling it into a client
// chunk crashes the page in the browser. That exact bug shipped once — after
// touching this boundary, verify with a real browser console, not with curl.

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
export const DEFAULT_SEO_TITLE_ES =
  "Facundo Majda — Ingeniero en AI/ML y Automatización";
export const DEFAULT_SEO_DESCRIPTION_ES =
  "Ingeniero en AI/ML y automatización. Diseño y llevo a producción sistemas de IA — pipelines RAG, agentes con LLM, visión por computadora y el backend que los sostiene.";
export const FALLBACK_HERO_TAGLINE =
  "SWE | Data & AI-Driven Apps | FDE | Full-Stack + Automation";
export const FALLBACK_STATUS_LINE =
  "Available for remote engineering roles and selected projects";

// `origin` is the site root (profile.seoUrl, seeded to SITE_URL); `canonical`
// is the page itself. /es is its own canonical but shares the site origin in
// the hreflang links and the JSON-LD person/website ids.
export function resolveSeo(row: ProfileRow | null, locale: Locale = "en") {
  const origin = row?.seoUrl ?? SITE_URL;
  if (locale === "es") {
    return {
      title: DEFAULT_SEO_TITLE_ES,
      description: DEFAULT_SEO_DESCRIPTION_ES,
      canonical: `${SITE_URL}/es`,
      origin,
    };
  }
  return {
    title: row?.seoTitle ?? DEFAULT_SEO_TITLE,
    description: row?.seoDescription ?? DEFAULT_SEO_DESCRIPTION,
    canonical: origin,
    origin,
  };
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
