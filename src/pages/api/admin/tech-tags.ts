import { db } from "@/db";
import { techTag } from "@/db/schema";
import { eq } from "drizzle-orm";
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
      const body = req.body as { name?: unknown; category?: unknown; featured?: unknown; order?: unknown };
      const created = await db
        .insert(techTag)
        .values({
          name: String(body.name ?? ""),
          category: String(body.category ?? ""),
          featured: Boolean(body.featured ?? true),
          order: Number(body.order ?? 0),
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
      const updated = await db
        .update(techTag)
        .set(updates)
        .where(eq(techTag.id, body.id))
        .returning();
      res.status(200).json(updated[0]);
    } else if (req.method === "DELETE") {
      const body = req.body as { id?: unknown };
      if (typeof body.id !== "string") {
        res.status(400).json({ error: "id required" });
        return;
      }
      await db.delete(techTag).where(eq(techTag.id, body.id));
      res.status(200).json({ ok: true });
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : "Unknown error" });
  }
}

