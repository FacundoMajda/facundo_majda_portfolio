import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import ws from "ws";
import * as schema from "./schema";

if (typeof WebSocket === "undefined") {
  neonConfig.webSocketConstructor = ws;
}

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error("DATABASE_URL is not set");
}

const sql = neon(url);
export const db = drizzle(sql, { schema });
export { schema };
