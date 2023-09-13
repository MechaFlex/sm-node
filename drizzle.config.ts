import type { Config } from "drizzle-kit"

export default {
  schema: "./src/lib/server/db/schema/schema.ts",
  out: "./drizzle",
  driver: "better-sqlite",
  dbCredentials: {
    url: "./database/sqlite.db",
  },
} satisfies Config
