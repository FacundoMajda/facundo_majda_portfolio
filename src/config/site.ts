// Single source of truth for the canonical origin. robots.txt, sitemap.xml,
// canonical, og:url and JSON-LD all read from here (or from profile.seoUrl in
// the DB, which is seeded to the same value).
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://faqmajda.xyz";

export const SITE_NAME = "Facundo Majda";
