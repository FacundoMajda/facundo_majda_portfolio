import type { NextApiRequest, NextApiResponse } from "next";

// Reverse-proxies every /api/auth/* call to Neon's hosted auth API.
//
// Root cause this fixes: the browser used to call Neon's auth domain
// directly, so the session cookie's Domain was neonauth...neon.tech.
// A browser NEVER sends a cookie for one domain on a request to another
// domain, regardless of SameSite/Secure — so this app's own server-side
// session checks (proxy.ts, /api/admin/*) could never see that cookie on
// requests to facundomajdaportfolio.vercel.app. Sign-in would succeed,
// the cookie would exist in the browser, and every subsequent request to
// this app would still look unauthenticated. Proxying through our own
// domain and stripping the cookie's Domain attribute makes it first-party.
//
// Does not use @neondatabase/auth's own authApiHandler: that's built for
// App Router route handlers (Request/Response, App Router-only params
// shape) and, like createNeonAuth, statically imports next/headers, which
// crashes when loaded from a Pages Router API route.

const baseUrl = process.env.NEON_AUTH_BASE_URL;
if (!baseUrl) {
  throw new Error("NEON_AUTH_BASE_URL is not set");
}

export const config = {
  api: { bodyParser: false },
};

// x-forwarded-* describes the inbound connection to THIS server (Next.js
// injects it automatically); forwarding it to the upstream fetch caused
// Next's own fetch instrumentation to redirect the connection to
// x-forwarded-host (localhost) instead of the real upstream host —
// surfaced as ECONNREFUSED 127.0.0.1:443.
const HOP_BY_HOP = new Set([
  "host",
  "connection",
  "content-length",
  "accept-encoding",
  "transfer-encoding",
  "expect",
  "keep-alive",
  "x-forwarded-for",
  "x-forwarded-host",
  "x-forwarded-port",
  "x-forwarded-proto",
]);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const segments = req.query.all;
  const path = Array.isArray(segments) ? segments.join("/") : (segments ?? "");
  const search = req.url?.includes("?") ? req.url.slice(req.url.indexOf("?")) : "";
  const upstreamUrl = `${baseUrl}/${path}${search}`;

  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (!value || HOP_BY_HOP.has(key.toLowerCase())) continue;
    headers.set(key, Array.isArray(value) ? value.join(", ") : value);
  }

  const hasBody = req.method !== "GET" && req.method !== "HEAD";
  const rawBody = hasBody
    ? await new Promise<Buffer>((resolve, reject) => {
        const chunks: Buffer[] = [];
        req.on("data", (chunk) => chunks.push(chunk));
        req.on("end", () => resolve(Buffer.concat(chunks)));
        req.on("error", reject);
      })
    : undefined;
  // Neon's auth API (Fastify) rejects anything but Content-Type:
  // application/json, and separately rejects application/json with an
  // empty body — a no-payload POST like sign-out sends neither a body nor
  // a matching content-type by default. This proxy only ever talks to
  // that one JSON API, so normalize both unconditionally.
  const body = hasBody && rawBody && rawBody.length > 0 ? rawBody : hasBody ? Buffer.from("{}") : undefined;
  if (hasBody) {
    headers.set("content-type", "application/json");
  }

  let upstream: Response;
  try {
    upstream = await fetch(upstreamUrl, {
      method: req.method,
      headers,
      body: body as BodyInit | undefined,
    });
  } catch (e) {
    console.error("[api/auth proxy] upstream fetch failed:", e instanceof Error ? e.message : e);
    res.status(502).json({ error: "Auth service unreachable" });
    return;
  }

  res.status(upstream.status);
  upstream.headers.forEach((value, key) => {
    const k = key.toLowerCase();
    if (k === "set-cookie" || k === "content-encoding" || k === "transfer-encoding" || k === "content-length") return;
    res.setHeader(key, value);
  });

  const setCookies = upstream.headers.getSetCookie();
  if (setCookies.length > 0) {
    res.setHeader(
      "set-cookie",
      setCookies.map((cookie) => cookie.replace(/;\s*Domain=[^;]+/i, "")),
    );
  }

  const responseBody = Buffer.from(await upstream.arrayBuffer());
  res.send(responseBody);
}
