import { db } from "@/db";
import { socialLink } from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import type { NextApiRequest, NextApiResponse } from "next";
import { auth } from "@/lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookieHeader = req.headers.cookie;
const session = await auth.getSession({ fetchOptions: { headers: new Headers({ cookie: cookieHeader ?? "" }) } });
  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    if (req.method === "POST") {
      const body = req.body as Record<string, unknown>;
      const created = await db
        .insert(socialLink)
        .values({
          platform: String(body.platform ?? ""),
          url: String(body.url ?? ""),
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
      const updated = await db.update(socialLink).set(updates).where(eq(socialLink.id, body.id)).returning();
      res.status(200).json(updated[0]);
    } else if (req.method === "DELETE") {
      const body = req.body as { id?: unknown };
      if (typeof body.id !== "string") {
        res.status(400).json({ error: "id required" });
        return;
      }
      await db.delete(socialLink).where(eq(socialLink.id, body.id));
      res.status(200).json({ ok: true });
    } else if (req.method === "GET") {
      const rows = await db.select().from(socialLink).orderBy(asc(socialLink.order));
      res.status(200).json(rows);
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : "Unknown error" });
  }
}

