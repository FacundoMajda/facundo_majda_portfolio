// Shared shapes for the per-page markdown mirrors served at <path>.md.
// Rendering helpers live in frontmatter.ts; the route is pages/api/md/[...path].ts.

export type Locale = "en" | "es";

export type MarkdownMirror = {
  /** Page title, same source as the HTML page's <title>. */
  title: string;
  /** Meta description, same source as the HTML page's head. */
  description: string;
  /** Absolute canonical URL of the HTML page this mirror represents. */
  source: string;
  /** Markdown body, without frontmatter. */
  body: string;
};
