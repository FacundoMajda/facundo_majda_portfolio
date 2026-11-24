import { renderHomeMirror } from "./home";
import { renderServiceMirror } from "./services";
import type { MarkdownMirror } from "./types";

// Maps the segments of a /<path>.md request to the page it mirrors:
// "/index.md" and "/es.md" ("/es/index.md" alias) are the home pages, and
// every other path resolves against the service pages.
export async function resolveMirror(
  segments: string[],
): Promise<MarkdownMirror | null> {
  if (segments.length === 0) return null;

  const path = segments.join("/");
  if (path === "index") return renderHomeMirror("en");
  if (path === "es" || path === "es/index") return renderHomeMirror("es");

  return renderServiceMirror(`/${path}`);
}
