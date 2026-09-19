import { db } from "@/db";
import { experience } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
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
        .insert(experience)
        .values({
          company: String(body.company ?? ""),
          link: body.link ? String(body.link) : null,
          role: String(body.role ?? ""),
          startDate: new Date(String(body.startDate ?? new Date().toISOString())),
          endDate: body.endDate ? new Date(String(body.endDate)) : null,
          description: String(body.description ?? ""),
          isCurrent: Boolean(body.isCurrent ?? false),
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
      if (updates.startDate) updates.startDate = new Date(String(updates.startDate));
      if (updates.endDate === null || updates.endDate === undefined) {
        // keep as null
      } else if (updates.endDate) {
        updates.endDate = new Date(String(updates.endDate));
      }
      const updated = await db
        .update(experience)
        .set(updates)
        .where(eq(experience.id, body.id))
        .returning();
      res.status(200).json(updated[0]);
    } else if (req.method === "DELETE") {
      const body = req.body as { id?: unknown };
      if (typeof body.id !== "string") {
        res.status(400).json({ error: "id required" });
        return;
      }
      await db.delete(experience).where(eq(experience.id, body.id));
      res.status(200).json({ ok: true });
    } else if (req.method === "GET") {
      const rows = await db.select().from(experience).orderBy(desc(experience.startDate));
      res.status(200).json(rows);
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : "Unknown error" });
  }
}

