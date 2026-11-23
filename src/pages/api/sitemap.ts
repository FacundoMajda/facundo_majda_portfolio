import type { NextApiRequest, NextApiResponse } from "next";
import { SITE_URL } from "@/config/site";
import { SERVICE_PAGES } from "@/content/service-pages";

// Dynamic sitemap. Replaces the static public/sitemap.xml so the lastmod is
// real and every localized page is listed with its language alternates.
export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  const lastmod = new Date().toISOString().slice(0, 10);
  const entries = [
    { loc: `${SITE_URL}/`, lang: "en" },
    { loc: `${SITE_URL}/es`, lang: "es-AR" },
    ...SERVICE_PAGES.map((page) => ({
      loc: `${SITE_URL}${page.path}`,
      lang: "es-AR",
    })),
  ];

  const alternates = [
    `<xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/"/>`,
    `<xhtml:link rel="alternate" hreflang="es-AR" href="${SITE_URL}/es"/>`,
    `<xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/"/>`,
  ].join("");

  const urls = entries
    .map(
      (entry) =>
        `  <url>\n    <loc>${entry.loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    ${alternates}\n  </url>`,
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
