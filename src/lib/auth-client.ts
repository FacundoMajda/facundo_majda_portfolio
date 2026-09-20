"use client";

// Talks to our own /api/auth/* reverse proxy (see
// src/pages/api/auth/[...all].ts), not Neon's auth domain directly, so the
// session cookie is set as first-party on this app's own domain.

const AUTH_BASE = "/api/auth";
const REQUEST_TIMEOUT_MS = 10_000;

export type SignInError = {
  kind: "invalid_credentials" | "network" | "server" | "timeout";
  message: string;
};

type SignInResult = { error: SignInError | null };

async function withTimeout<T>(fn: (signal: AbortSignal) => Promise<T>): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fn(controller.signal);
  } finally {
    clearTimeout(timer);
  }
}

async function postSignInEmail(email: string, password: string): Promise<SignInResult> {
  let res: Response;
  try {
    res = await withTimeout((signal) =>
      fetch(`${AUTH_BASE}/sign-in/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
        signal,
      }),
    );
  } catch (e) {
    if (e instanceof DOMException && e.name === "AbortError") {
      return { error: { kind: "timeout", message: "The sign-in request timed out. Try again." } };
    }
    return { error: { kind: "network", message: "Could not reach the auth service. Check your connection and try again." } };
  }

  if (res.ok) return { error: null };

  let payload: unknown = null;
  try {
    payload = await res.json();
  } catch {
    /* ignore */
  }
  const serverMessage =
    payload && typeof payload === "object" && "message" in payload && typeof (payload as { message: unknown }).message === "string"
      ? (payload as { message: string }).message
      : null;

  if (res.status === 401 || res.status === 400 || res.status === 422) {
    return { error: { kind: "invalid_credentials", message: serverMessage ?? "Invalid email or password." } };
  }
  return { error: { kind: "server", message: serverMessage ?? `The auth service returned an error (HTTP ${res.status}).` } };
}

async function getSession(): Promise<{ email: string } | null> {
  try {
    const res = await withTimeout((signal) =>
      fetch(`${AUTH_BASE}/get-session`, { credentials: "include", signal }),
    );
    if (!res.ok) return null;
    const data = (await res.json().catch(() => null)) as { user?: { email?: string } } | null;
    return data?.user?.email ? { email: data.user.email } : null;
  } catch {
    return null;
  }
}

async function postSignOut(): Promise<void> {
  await fetch(`${AUTH_BASE}/sign-out`, { method: "POST", credentials: "include" }).catch(() => {});
}

export const authClient = {
  signIn: { email: postSignInEmail },
  getSession,
  signOut: postSignOut,
};
