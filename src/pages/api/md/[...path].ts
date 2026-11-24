import type { NextApiRequest, NextApiResponse } from "next";
import { resolveMirror } from "@/lib/markdown/registry";
import { toMarkdownDocument } from "@/lib/markdown/frontmatter";

// Serves the markdown mirror of a page at /<path>.md (see next.config rewrites).
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.setHeader("Allow", "GET, HEAD");
    res.status(405).send("Method not allowed.\n");
    return;
  }

  const raw = req.query.path;
  const segments = Array.isArray(raw) ? raw : raw ? [raw] : [];

  const mirror = await resolveMirror(segments);
  if (!mirror) {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.status(404).send("Not found.\n");
    return;
  }

  res.setHeader("Content-Type", "text/markdown; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=86400",
  );
  res.status(200).send(toMarkdownDocument(mirror));
}
