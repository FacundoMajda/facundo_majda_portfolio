import type { MarkdownMirror } from "./types";

// Matches the reference format (zapf.dev/about.md): three quoted scalars.
// JSON string literals are valid YAML double-quoted scalars, so inner quotes
// are escaped safely without a yaml dependency.
export function toMarkdownDocument(mirror: MarkdownMirror): string {
  const head = [
    "---",
    `title: ${JSON.stringify(mirror.title)}`,
    `description: ${JSON.stringify(mirror.description)}`,
    `source: ${JSON.stringify(mirror.source)}`,
    "---",
  ].join("\n");
  return `${head}\n\n${mirror.body.trim()}\n`;
}
