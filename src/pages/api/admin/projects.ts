import { db } from "@/db";
import { project } from "@/db/schema";
import { asc, eq } from "drizzle-orm";
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
        .insert(project)
        .values({
          slug: String(body.slug ?? ""),
          title: String(body.title ?? ""),
          category: body.category ? String(body.category) : null,
          tech: Array.isArray(body.tech) ? (body.tech as string[]) : [],
          shortDesc: String(body.shortDesc ?? ""),
          longDesc: String(body.longDesc ?? ""),
          repoUrl: body.repoUrl ? String(body.repoUrl) : null,
          caseStudyUrl: body.caseStudyUrl ? String(body.caseStudyUrl) : null,
          color: body.color ? String(body.color) : null,
          images: Array.isArray(body.images) ? (body.images as string[]).map(String) : [],
          metrics: body.metrics && typeof body.metrics === "object" ? (body.metrics as Record<string, unknown>) : null,
          isClientWork: Boolean(body.isClientWork ?? false),
          featured: Boolean(body.featured ?? true),
          order: Number(body.order ?? 0),
          publishedAt: body.publishedAt ? new Date(String(body.publishedAt)) : null,
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
      if (typeof updates.tech === "string") {
        updates.tech = updates.tech.split(",").map((s) => s.trim()).filter(Boolean);
      }
      if (updates.publishedAt === null || updates.publishedAt === undefined || updates.publishedAt === "") {
        updates.publishedAt = null;
      } else if (updates.publishedAt) {
        updates.publishedAt = new Date(String(updates.publishedAt));
      }
      const updated = await db.update(project).set(updates).where(eq(project.id, body.id)).returning();
      res.status(200).json(updated[0]);
    } else if (req.method === "DELETE") {
      const body = req.body as { id?: unknown };
      if (typeof body.id !== "string") {
        res.status(400).json({ error: "id required" });
        return;
      }
      await db.delete(project).where(eq(project.id, body.id));
      res.status(200).json({ ok: true });
    } else if (req.method === "GET") {
      const rows = await db.select().from(project).orderBy(asc(project.order));
      res.status(200).json(
        rows.map((r) => ({
          ...r,
          publishedAt: r.publishedAt ? r.publishedAt.toISOString() : null,
        })),
      );
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : "Unknown error" });
  }
}

