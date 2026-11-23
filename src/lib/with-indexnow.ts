import type { NextApiHandler } from "next";
import { pingIndexNow } from "./indexnow";

/**
 * Wrap an admin API route so every successful write (POST/PATCH/PUT/DELETE)
 * pings IndexNow, telling Bing/Yandex to re-crawl the site. Reads are ignored
 * and the ping is fire-and-forget, so it can never affect the response.
 */
export function withIndexNow(handler: NextApiHandler): NextApiHandler {
  return async (req, res) => {
    await handler(req, res);
    if (
      req.method &&
      req.method !== "GET" &&
      res.statusCode >= 200 &&
      res.statusCode < 300
    ) {
      void pingIndexNow();
    }
  };
}
