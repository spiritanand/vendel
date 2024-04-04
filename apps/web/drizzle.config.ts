import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/libWeb/db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: "postgres://postgres:admin@0.0.0.0:5432/postgres",
  },
  out: "./drizzle",
  verbose: true,
  strict: true,
});
