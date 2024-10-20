import { defineConfig } from "drizzle-kit";
import { pgSchema } from "drizzle-orm/pg-core";
import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

export const schema = pgSchema("analytics");

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema/*",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_DRIZZLE_URL!,
  },
  migrations: {
    prefix: "supabase",
  },
  verbose: true,
  strict: true,
  schemaFilter: "analytics",
});
