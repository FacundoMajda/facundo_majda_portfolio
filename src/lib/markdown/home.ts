import { SITE_URL } from "@/config/site";
import { COPY } from "@/i18n/copy";
import {
  FALLBACK_HERO_TAGLINE,
  FALLBACK_STATUS_LINE,
  fmtRange,
  loadPortfolioContent,
  resolveSeo,
} from "@/lib/portfolio-content";
import type { Locale, MarkdownMirror } from "./types";

// The home page's markdown mirror (served at /index.md and /es.md): it renders
// from the same loader, copy constants and fallbacks as src/pages/index.tsx, so
// the HTML page and this text cannot diverge. Section order follows the page.

export async function renderHomeMirror(
  locale: Locale,
): Promise<MarkdownMirror> {
  const c = COPY[locale];
  const {
    profile: p,
    socials,
    techs,
    experiences,
    educations,
  } = await loadPortfolioContent(locale);
  const seo = resolveSeo(p, locale);

  const blocks: string[] = [];

  blocks.push("# AI/ML & Automation");
  blocks.push(c.heroLabel);
  blocks.push(`## ${c.heroHi} Facundo Majda`);
  blocks.push(`${p?.heroTitle ?? c.heroFallback} — ${c.heroSub}.`);
  blocks.push(p?.heroTagline ?? FALLBACK_HERO_TAGLINE);
  blocks.push(p?.statusLine ?? FALLBACK_STATUS_LINE);

  blocks.push(
    `## ${c.aboutHead1} AI/ML & Automation Engineer ${c.aboutHead3} ${c.aboutHead4}.`,
  );
  blocks.push(`AI/ML · LLMs · ${c.sys2Title} · Backend · Automation`);
  blocks.push(c.aboutP1);
  blocks.push(c.aboutP2);
  blocks.push(`### ${c.systemsTitle}`);
  blocks.push(`#### ${c.sys1Title}`);
  blocks.push(c.sys1Body);
  blocks.push(`#### ${c.sys2Title}`);
  blocks.push(c.sys2Body);
  blocks.push(`#### ${c.sys3Title}`);
  blocks.push(c.sys3Body);
  blocks.push(`#### ${c.sys4Title}`);
  blocks.push(c.sys4Body);

  // Same tag semantics as the page: rows with an icon, grouped by consecutive
  // category (the query orders by category), names in page order.
  blocks.push(`## ${c.expertiseLabel}`);
  const categories = techs.reduce<{ name: string; items: string[] }[]>(
    (acc, t) => {
      const last = acc[acc.length - 1];
      if (!last || last.name !== t.category) {
        acc.push({ name: t.category, items: [t.name] });
      } else {
        last.items.push(t.name);
      }
      return acc;
    },
    [],
  );
  for (const category of categories) {
    blocks.push(`### ${c.stackCategories[category.name] ?? category.name}`);
    blocks.push(category.items.join(", "));
  }

  blocks.push(`## ${c.educationLabel}`);
  for (const e of educations) {
    const institution = e.link ? `[${e.institution}](${e.link})` : e.institution;
    const date = e.endDate
      ? fmtRange(e.startDate, e.endDate, false)
      : fmtRange(e.startDate, null, true);
    blocks.push(`### ${e.degree}`);
    blocks.push(`${institution} (${date})`);
    blocks.push(e.description);
  }

  blocks.push(`## ${c.experienceLabel}`);
  for (const j of experiences) {
    const company = j.link ? `[${j.company}](${j.link})` : j.company;
    blocks.push(`### ${j.role}`);
    blocks.push(`${company} (${fmtRange(j.startDate, j.endDate, j.isCurrent)})`);
    blocks.push(j.description);
  }

  blocks.push(`## ${c.contactTitle}`);
  blocks.push(
    `Contact form: ${c.contactEmailLabel} · ${c.contactContactLabel} · ${c.contactMessageLabel} — ${c.contactSubmit}.`,
  );
  const links: string[] = [];
  if (p?.contactEmail) {
    links.push(`- Email: [${p.contactEmail}](mailto:${p.contactEmail})`);
  }
  for (const s of socials.filter((s) => s.platform !== "email")) {
    links.push(`- [${s.platform}](${s.url})`);
  }
  if (links.length > 0) blocks.push(links.join("\n"));

  return {
    title: seo.title,
    description: seo.description,
    source: locale === "es" ? `${SITE_URL}/es` : `${SITE_URL}/`,
    body: blocks.join("\n\n"),
  };
}
