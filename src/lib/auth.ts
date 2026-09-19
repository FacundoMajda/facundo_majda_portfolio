import { createAuthServer } from "@neondatabase/auth/server";

export const auth = createAuthServer({
  baseUrl: process.env.NEON_AUTH_BASE_URL ?? "https://ep-bitter-cake-acpaue5w.neonauth.sa-east-1.aws.neon.tech/neondb/auth",
  cookies: {
    secret: process.env.NEON_AUTH_COOKIE_SECRET ?? "fallback-dev-secret-change-in-prod-min-32-chars",
  },
});
