import type { NextApiRequest, NextApiResponse } from "next";
import { SITE_URL } from "@/config/site";
import { SERVICE_PAGES } from "@/content/service-pages";

// Dynamic sitemap. Replaces the static public/sitemap.xml so the lastmod is
// real and every localized page is listed with its own language alternates.
type SitemapAlternate = { hreflang: string; href: string };
type SitemapEntry = { loc: string; alternates: SitemapAlternate[] };

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  const lastmod = new Date().toISOString().slice(0, 10);
  const EN_HOME = `${SITE_URL}/`;
  const ES_HOME = `${SITE_URL}/es`;
  const EN_SERVICES = `${SITE_URL}/services`;
  const ES_SERVICES = `${SITE_URL}/es/servicios`;

  const entries: SitemapEntry[] = [
    {
      loc: EN_HOME,
      alternates: [
        { hreflang: "en", href: EN_HOME },
        { hreflang: "es-AR", href: ES_HOME },
        { hreflang: "x-default", href: EN_HOME },
      ],
    },
    {
      loc: ES_HOME,
      alternates: [
        { hreflang: "en", href: EN_HOME },
        { hreflang: "es-AR", href: ES_HOME },
        { hreflang: "x-default", href: EN_HOME },
      ],
    },
    {
      loc: EN_SERVICES,
      alternates: [
        { hreflang: "en", href: EN_SERVICES },
        { hreflang: "es-AR", href: ES_SERVICES },
        { hreflang: "x-default", href: EN_SERVICES },
      ],
    },
    ...SERVICE_PAGES.map((page): SitemapEntry => {
      const loc = `${SITE_URL}${page.path}`;
      if (page.path === "/es/servicios") {
        return {
          loc,
          alternates: [
            { hreflang: "en", href: EN_SERVICES },
            { hreflang: "es-AR", href: loc },
            { hreflang: "x-default", href: EN_SERVICES },
          ],
        };
      }
      return { loc, alternates: [{ hreflang: "es-AR", href: loc }] };
    }),
  ];

  const urls = entries
    .map(
      (entry) =>
        `  <url>\n    <loc>${entry.loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    ${entry.alternates
          .map(
            (alt) =>
              `<xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}"/>`,
          )
          .join("")}\n  </url>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=86400",
  );
  res.status(200).send(xml);
}
