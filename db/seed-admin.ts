import { randomBytes } from "node:crypto";

const NEON_AUTH_BASE_URL =
  process.env.NEON_AUTH_BASE_URL ?? "https://ep-bitter-cake-acpaue5w.neonauth.sa-east-1.aws.neon.tech/neondb/auth";

// Email comes from env if set, otherwise defaults to Facundo's public contact email.
// Password: if ADMIN_PASSWORD env is set, use it; otherwise generate a strong one
// and persist it to .env.local so the developer can read it locally.
function generatePassword(): string {
  // 24 chars from base64 (192 bits of entropy) — readable, copy-pasteable
  return randomBytes(18).toString("base64").replace(/[+/=]/g, (c) => ({ "+": "x", "/": "y", "=": "" })[c] ?? c);
}

async function userExists(email: string): Promise<boolean> {
  // Neon Auth exposes a list-users endpoint under /admin, but it requires admin auth.
  // Try sign-in with a guaranteed-bad password: if it returns 401/INVALID_CREDENTIALS
  // the user exists; if it returns 422 (invalid email) the user does not exist.
  const res = await fetch(`${NEON_AUTH_BASE_URL}/sign-in/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password: "__probe__" }),
  });
  if (res.status === 401 || res.status === 400) return true;
  if (res.status === 422 || res.status === 404) return false;
  return false;
}

async function createUser(email: string, password: string, name: string): Promise<void> {
  const res = await fetch(`${NEON_AUTH_BASE_URL}/sign-up/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
    },
    body: JSON.stringify({ email, password, name }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`sign-up failed (${res.status}): ${text}`);
  }
}

async function persistToEnvLocal(email: string, password: string) {
  const fs = await import("node:fs/promises");
  const path = ".env.local";
  let existing = "";
  try {
    existing = await fs.readFile(path, "utf8");
  } catch {
    /* file may not exist yet */
  }
  const lines = existing.split(/\r?\n/);
  const filtered = lines.filter(
    (l) => !/^ADMIN_EMAIL\s*=/.test(l) && !/^ADMIN_INITIAL_PASSWORD\s*=/.test(l),
  );
  filtered.push(`ADMIN_EMAIL=${email}`);
  filtered.push(`ADMIN_INITIAL_PASSWORD=${password}`);
  await fs.writeFile(path, filtered.filter(Boolean).join("\n") + "\n");
}

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "facundomajda13@gmail.com";
  const name = process.env.ADMIN_NAME ?? "Facundo Majda";

  if (await userExists(email)) {
    console.log(`✓ Admin user "${email}" already exists.`);
    console.log(`  Use the ADMIN_INITIAL_PASSWORD in .env.local (or trigger a password-reset email from Neon Auth).`);
    process.exit(0);
  }

  const password = process.env.ADMIN_PASSWORD ?? generatePassword();

  console.log(`Creating admin user "${email}"...`);
  await createUser(email, password, name);
  console.log("✓ User created.");

  if (!process.env.ADMIN_PASSWORD) {
    await persistToEnvLocal(email, password);
    console.log(`✓ Initial password persisted to .env.local (ADMIN_INITIAL_PASSWORD=...).`);
    console.log(`  Read it from .env.local on your machine — never paste it anywhere.`);
  } else {
    console.log(`✓ Used ADMIN_PASSWORD from env (not persisted to .env.local).`);
  }

  process.exit(0);
}

main().catch((err) => {
  console.error("❌", err instanceof Error ? err.message : err);
  process.exit(1);
});
