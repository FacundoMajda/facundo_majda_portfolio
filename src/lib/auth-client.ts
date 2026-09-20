"use client";

// Direct HTTP client to Neon's hosted Better Auth API.
// Avoids SDK version coupling with Next 15 vs 16.

const NEON_AUTH_BASE_URL = process.env.NEXT_PUBLIC_NEON_AUTH_BASE_URL ?? "";

type SignInResult = { error: { message: string } | null };

async function postSignInEmail(email: string, password: string): Promise<SignInResult> {
  const res = await fetch(`${NEON_AUTH_BASE_URL}/sign-in/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });
  if (res.ok) return { error: null };
  let payload: unknown = null;
  try {
    payload = await res.json();
  } catch {
    /* ignore */
  }
  const message =
    payload && typeof payload === "object" && "message" in payload && typeof (payload as { message: unknown }).message === "string"
      ? (payload as { message: string }).message
      : `Sign-in failed (HTTP ${res.status})`;
  return { error: { message } };
}

async function postSignOut(): Promise<void> {
  await fetch(`${NEON_AUTH_BASE_URL}/sign-out`, {
    method: "POST",
    credentials: "include",
  });
}

export const authClient = {
  signIn: { email: postSignInEmail },
  signOut: postSignOut,
};
