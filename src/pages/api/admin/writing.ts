import { db } from "@/db";
import { writingEntry } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import type { NextApiRequest, NextApiResponse } from "next";
import { getAdminSession, isAdminEmail } from "@/lib/admin-session";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookieHeader = req.headers.cookie;
const sessionUser = await getAdminSession(cookieHeader);
  if (!isAdminEmail(sessionUser?.email)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    if (req.method === "POST") {
      const body = req.body as Record<string, unknown>;
      const created = await db
        .insert(writingEntry)
        .values({
          slug: String(body.slug ?? ""),
          title: String(body.title ?? ""),
          summary: String(body.summary ?? ""),
          url: String(body.url ?? ""),
          platform: String(body.platform ?? "dev.to"),
          language: String(body.language ?? "es"),
          publishedAt: new Date(String(body.publishedAt ?? new Date().toISOString())),
        })
        .returning();
      res.status(200).json(created[0]);
    } else if (req.method === "PATCH") {
      const body = req.body as { id?: unknown } & Record<string, unknown>;
      if (typeof body.id !== "string") {
        res.status(400).json({ error: "id required" });
        return;
      }
      const updates: Record<string, unknown> = { ...body };
      delete updates.id;
      if (updates.publishedAt) updates.publishedAt = new Date(String(updates.publishedAt));
      const updated = await db.update(writingEntry).set(updates).where(eq(writingEntry.id, body.id)).returning();
      res.status(200).json(updated[0]);
    } else if (req.method === "DELETE") {
      const body = req.body as { id?: unknown };
      if (typeof body.id !== "string") {
        res.status(400).json({ error: "id required" });
        return;
      }
      await db.delete(writingEntry).where(eq(writingEntry.id, body.id));
      res.status(200).json({ ok: true });
    } else if (req.method === "GET") {
      const rows = await db.select().from(writingEntry).orderBy(desc(writingEntry.publishedAt));
      res.status(200).json(rows);
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : "Unknown error" });
  }
}

