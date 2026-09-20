import { db } from "@/db";
import { profile } from "@/db/schema";
import type { NextApiRequest, NextApiResponse } from "next";
import { getAdminSession, isAdminEmail } from "@/lib/admin-session";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const cookieHeader = req.headers.cookie;
const sessionUser = await getAdminSession(cookieHeader);
  if (!isAdminEmail(sessionUser?.email)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const body = req.body as {
    heroTitle?: unknown;
    heroTagline?: unknown;
    aboutText?: unknown;
    statusLine?: unknown;
    yearsExp?: unknown;
    contactEmail?: unknown;
    seoTitle?: unknown;
    seoDescription?: unknown;
    seoUrl?: unknown;
  };

  const data = {
    id: "singleton" as const,
    heroTitle: String(body.heroTitle ?? ""),
    heroTagline: String(body.heroTagline ?? ""),
    aboutText: String(body.aboutText ?? ""),
    statusLine: String(body.statusLine ?? ""),
    yearsExp: Number(body.yearsExp ?? 0),
    contactEmail: String(body.contactEmail ?? ""),
    seoTitle: String(body.seoTitle ?? ""),
    seoDescription: String(body.seoDescription ?? ""),
    seoUrl: String(body.seoUrl ?? ""),
    updatedAt: new Date(),
  };

  try {
    await db.insert(profile).values(data).onConflictDoUpdate({
      target: profile.id,
      set: { ...data, id: undefined },
    });
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : "Unknown error" });
  }
}

