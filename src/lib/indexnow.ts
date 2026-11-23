import { SITE_URL } from "@/config/site";

// IndexNow key — the matching file lives at /7f3c9a1e5b2d8046a4c6e2f1b9d03a57.txt
const KEY = process.env.INDEXNOW_KEY ?? "7f3c9a1e5b2d8046a4c6e2f1b9d03a57";

/**
 * Tell Bing/Yandex (and any IndexNow participant) that a URL changed, so it is
 * re-crawled within minutes instead of weeks. Fire-and-forget: never let it
 * break a request. Call it after a successful content write (e.g. in the
 * `/api/admin/*` routes).
 */
export async function pingIndexNow(url: string = `${SITE_URL}/`) {
  try {
    await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: new URL(SITE_URL).host,
        key: KEY,
        keyLocation: `${SITE_URL}/${KEY}.txt`,
        urlList: [url],
      }),
    });
  } catch {
    // IndexNow is best-effort; a failure must never surface to the user.
  }
}
