import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  // Use the shared schema in the root app
  schema: "../src/db/schema",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "postgres://postgres:postgres@localhost:5432/cinco",
  },
});
