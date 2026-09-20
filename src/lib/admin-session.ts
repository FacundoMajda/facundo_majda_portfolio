// Deliberately does NOT import @neondatabase/auth/next/server: that module
// statically imports next/headers (App Router only) and crashes at request
// time when bundled into a Pages Router API route. Direct HTTP call instead,
// same approach already used by src/lib/auth-client.ts on the browser side.

const baseUrl = process.env.NEON_AUTH_BASE_URL;
if (!baseUrl) {
  throw new Error("NEON_AUTH_BASE_URL is not set");
}

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
if (!ADMIN_EMAIL) {
  throw new Error("ADMIN_EMAIL is not set");
}

// This app has exactly one operator. Neon Auth authenticates anyone who
// signs up on this instance; this is the authorization check that keeps
// out everyone but the admin.
export function isAdminEmail(email: string | null | undefined): boolean {
  return email === ADMIN_EMAIL;
}

export async function getAdminSession(
  cookieHeader: string | undefined,
): Promise<{ email: string } | null> {
  if (!cookieHeader) return null;
  const res = await fetch(`${baseUrl}/get-session`, {
    headers: { cookie: cookieHeader },
  });
  if (!res.ok) return null;
  const data = (await res.json().catch(() => null)) as { user?: { email?: string } } | null;
  return data?.user?.email ? { email: data.user.email } : null;
}
