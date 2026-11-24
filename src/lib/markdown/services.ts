import { SITE_URL } from "@/config/site";
import { SERVICE_PAGES } from "@/content/service-pages";
import { getServicePageContent } from "@/content/service-pages-content";
import type { MarkdownMirror } from "./types";

// Markdown mirror of a service page, served at <path>.md. It renders from the
// same content module as the React pages, in the same order they render, so the
// HTML page and this text cannot drift.

function linkHref(href: string): string {
  return href.startsWith("/") ? `${SITE_URL}${href}` : href;
}

export async function renderServiceMirror(
  path: string,
): Promise<MarkdownMirror | null> {
  const content = getServicePageContent(path);
  if (!content) return null;

  const blocks: string[] = [];

  blocks.push(content.kicker);
  blocks.push(`# ${content.h1}`);
  blocks.push(content.lede.map((segment) => segment.text).join(""));

  blocks.push(`## ${content.servicesHeading}`);
  for (const service of content.services) {
    blocks.push(`### ${service.title}`);
    blocks.push(service.body);
  }

  // Stack is rendered only by the bespoke pages: the six <ServicePage/>
  // instances have no stack section on screen.
  if (content.kind === "bespoke") {
    blocks.push(`## ${content.stackHeading}`);
    for (const group of content.stack) {
      if (group.group) blocks.push(`### ${group.group}`);
      blocks.push(group.items.join(", "));
    }
  }

  blocks.push(`## ${content.faqHeading}`);
  for (const item of content.faq) {
    blocks.push(`### ${item.q}`);
    blocks.push(item.a);
  }

  blocks.push(`## ${content.contact.heading}`);
  blocks.push(content.contact.body);
  if (content.contact.actions.length > 0) {
    blocks.push(
      content.contact.actions
        .map((action) => `- [${action.label}](${linkHref(action.href)})`)
        .join("\n"),
    );
  }

  const related = SERVICE_PAGES.filter((page) => page.path !== path);
  if (related.length > 0) {
    blocks.push("## [ SERVICIOS ]");
    blocks.push(
      related
        .map((page) => `- [${page.label}](${SITE_URL}${page.path})`)
        .join("\n"),
    );
  }

  return {
    title: content.title,
    description: content.description,
    source: `${SITE_URL}${path}`,
    body: blocks.join("\n\n"),
  };
}
