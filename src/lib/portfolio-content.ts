import { asc, desc, isNotNull, sql } from "drizzle-orm";
import { db } from "@/db";
import {
  education,
  experience,
  profile,
  socialLink,
  techTag,
} from "@/db/schema";
import type { Locale } from "@/lib/markdown/types";
import type {
  EducationRow,
  ExperienceRow,
  PortfolioContent,
  ProfileRow,
  SocialLinkRow,
  TechTagRow,
} from "./portfolio-shared";

// Server-only data source for the home page and its markdown mirror (S8/S10):
// the queries and the locale rule ((isEs ? xEs : null) ?? x) live here once.
// This module imports @/db, so only server contexts may import it: the page's
// getServerSideProps (which Next strips from the client bundle) and server
// routes. Pure helpers live in ./portfolio-shared — importing them from here
// in a component drags the db module into the browser and crashes the page.

function localized(primary: string, es: string | null, isEs: boolean): string {
  return (isEs ? es : null) ?? primary;
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
