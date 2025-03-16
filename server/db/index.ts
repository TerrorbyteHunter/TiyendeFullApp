import "dotenv/config"; // Load .env file
import "tsconfig-paths/register";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test the connection
pool.query("SELECT NOW()", (err) => {
  if (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
});

export const db = drizzle(pool);
