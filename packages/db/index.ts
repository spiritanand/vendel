import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const pool = new Pool({
  connectionString:
    process.env.DB_URL || "postgres://postgres:admin@0.0.0.0:5432/postgres",
});

export const db = drizzle(pool, { schema });
