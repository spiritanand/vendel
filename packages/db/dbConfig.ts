import { Config } from "drizzle-kit";

export const dbConfig: Config = {
  schema: "../../packages/db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString:
      process.env.DB_URL || "postgres://postgres:admin@0.0.0.0:5432/postgres",
  },
  out: "./drizzle",
  verbose: true,
  strict: true,
};
